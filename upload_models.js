const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manually parse .env.local to avoid needing dotenv package
try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index === -1) return;
      const key = trimmed.substring(0, index).trim();
      const val = trimmed.substring(index + 1).trim();
      process.env[key] = val;
    });
  }
} catch (err) {
  console.warn("Could not read .env.local, using process.env:", err.message);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function toLowerKeys(obj) {
  if (Array.isArray(obj)) return obj.map(toLowerKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.toLowerCase(), toLowerKeys(v)])
    );
  }
  return obj;
}

async function run() {
  try {
    const catalogPath = path.join(__dirname, '../CodlyAI/CodlyAI/Resources/model_catalog.json');
    if (!fs.existsSync(catalogPath)) {
      console.error("model_catalog.json not found at " + catalogPath);
      process.exit(1);
    }
    
    const catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
    const models = catalogData.models;
    
    console.log(`Loaded ${models.length} models from local catalog.`);
    
    for (const model of models) {
      const dbModel = toLowerKeys({
        id: model.id,
        name: model.name,
        provider: model.provider,
        description: model.description,
        category: model.category,
        tags: model.tags || [],
        huggingFaceRepo: model.huggingFaceRepo,
        fileName: model.fileName,
        fileSizeGB: model.fileSizeGB,
        quantization: model.quantization,
        recommendedDevices: model.recommendedDevices || [],
        minimumRAM: model.minimumRAM,
        isFeatured: model.isFeatured || false,
        isPopular: model.isPopular || false,
        license: model.license,
        downloadURL: model.downloadURL,
        nameTR: model.nameTR || null,
        nameDE: model.nameDE || null,
        descriptionTR: model.descriptionTR || null,
        descriptionDE: model.descriptionDE || null,
        categoryTR: model.categoryTR || null,
        categoryDE: model.categoryDE || null,
        tagsTR: model.tagsTR || [],
        tagsDE: model.tagsDE || []
      });
      
      console.log(`Uploading model ${model.id}...`);
      const { error } = await supabase
        .from('models')
        .upsert(dbModel, { onConflict: 'id' });
        
      if (error) {
        console.error(`Error uploading ${model.id}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${model.id}`);
      }
    }
    
    console.log("Upload job complete!");
  } catch (err) {
    console.error("Execution error:", err);
  }
}

run();
