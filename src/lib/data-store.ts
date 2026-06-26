import fs from 'fs/promises';
import path from 'path';

export async function getData(filename: string) {
  const filePath = path.join(process.cwd(), 'data', filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

export async function saveData(filename: string, data: any) {
  const filePath = path.join(process.cwd(), 'data', filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}
