const fs = require('fs');
const path = require('path');

const entities = [
  { name: 'news', title: 'News', fields: ['title', 'summary', 'tag', 'dateLabel'] },
  { name: 'tips', title: 'Tips', fields: ['title', 'body', 'symbol'] },
  { name: 'banners', title: 'Banners', fields: ['title', 'subtitle', 'symbol', 'linkedModelID'] },
  { name: 'categories', title: 'Categories', fields: ['name', 'subtitle', 'symbol'] }
];

for (const entity of entities) {
  const dir = path.join(__dirname, 'src/app/admin', entity.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const content = `"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ${entity.title}Page() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/${entity.name}").then(r => r.json()).then(setItems);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (editingItem?.id) {
      await fetch(\`/api/${entity.name}/\${editingItem.id}\`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
    } else {
      await fetch("/api/${entity.name}", {
        method: "POST",
        body: JSON.stringify(data)
      });
    }
    
    setIsOpen(false);
    setEditingItem(null);
    fetch("/api/${entity.name}").then(r => r.json()).then(setItems);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(\`/api/${entity.name}/\${id}\`, { method: "DELETE" });
    fetch("/api/${entity.name}").then(r => r.json()).then(setItems);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">${entity.title}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} ${entity.title}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              ${entity.fields.map(f => `
              <div className="space-y-2">
                <Label htmlFor="${f}">${f}</Label>
                <Input id="${f}" name="${f}" defaultValue={editingItem?.${f} || ""} />
              </div>`).join('')}
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            ${entity.fields.map(f => `<TableHead>${f}</TableHead>`).join('')}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              ${entity.fields.map(f => `<TableCell>{item.${f}}</TableCell>`).join('')}
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingItem(item); setIsOpen(true); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf-8');
}
