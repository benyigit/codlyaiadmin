"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ModelsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/models").then(r => r.json()).then(setItems);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    
    // Convert types
    data.fileSizeGB = parseFloat(data.fileSizeGB) || 0;
    data.minimumRAM = parseInt(data.minimumRAM) || 0;
    data.isFeatured = formData.get("isFeatured") === "on";
    data.isPopular = formData.get("isPopular") === "on";
    data.tags = (data.tags as string).split(',').map(t => t.trim()).filter(Boolean);
    data.recommendedDevices = (data.recommendedDevices as string).split(',').map(t => t.trim()).filter(Boolean);

    if (editingItem?.id) {
      await fetch(`/api/models/${editingItem.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
    } else {
      await fetch("/api/models", {
        method: "POST",
        body: JSON.stringify(data)
      });
    }
    
    setIsOpen(false);
    setEditingItem(null);
    fetch("/api/models").then(r => r.json()).then(setItems);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this model?")) return;
    await fetch(`/api/models/${id}`, { method: "DELETE" });
    fetch("/api/models").then(r => r.json()).then(setItems);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Models</h1>
        <Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Add New</Button><Dialog open={isOpen} onOpenChange={setIsOpen}>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Model" : "Add Model"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>ID (auto-generated if empty)</Label><Input name="id" defaultValue={editingItem?.id || ""} readOnly={!!editingItem} /></div>
                <div className="space-y-2"><Label>Name</Label><Input name="name" defaultValue={editingItem?.name || ""} required /></div>
                <div className="space-y-2"><Label>Provider</Label><Input name="provider" defaultValue={editingItem?.provider || ""} required /></div>
                <div className="space-y-2"><Label>Category</Label><Input name="category" defaultValue={editingItem?.category || ""} required /></div>
                <div className="space-y-2 col-span-2"><Label>Description</Label><Textarea name="description" defaultValue={editingItem?.description || ""} /></div>
                <div className="space-y-2"><Label>Tags (comma separated)</Label><Input name="tags" defaultValue={editingItem?.tags?.join(", ") || ""} /></div>
                <div className="space-y-2"><Label>HuggingFace Repo</Label><Input name="huggingFaceRepo" defaultValue={editingItem?.huggingFaceRepo || ""} required /></div>
                <div className="space-y-2"><Label>File Name</Label><Input name="fileName" defaultValue={editingItem?.fileName || ""} required /></div>
                <div className="space-y-2"><Label>Download URL</Label><Input name="downloadURL" defaultValue={editingItem?.downloadURL || ""} required /></div>
                <div className="space-y-2"><Label>File Size (GB)</Label><Input name="fileSizeGB" type="number" step="0.01" defaultValue={editingItem?.fileSizeGB || ""} required /></div>
                <div className="space-y-2"><Label>Quantization</Label><Input name="quantization" defaultValue={editingItem?.quantization || ""} required /></div>
                <div className="space-y-2"><Label>Recommended Devices (comma separated)</Label><Input name="recommendedDevices" defaultValue={editingItem?.recommendedDevices?.join(", ") || ""} /></div>
                <div className="space-y-2"><Label>Minimum RAM (GB)</Label><Input name="minimumRAM" type="number" defaultValue={editingItem?.minimumRAM || ""} required /></div>
                <div className="space-y-2"><Label>License</Label><Input name="license" defaultValue={editingItem?.license || ""} /></div>
                <div className="flex items-center space-x-2 mt-6">
                  <input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={editingItem?.isFeatured} />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <input type="checkbox" id="isPopular" name="isPopular" defaultChecked={editingItem?.isPopular} />
                  <Label htmlFor="isPopular">Popular</Label>
                </div>
              </div>
              <Button type="submit" className="w-full">Save Model</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Size (GB)</TableHead>
            <TableHead>Flags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.provider}</TableCell>
              <TableCell>{item.fileSizeGB}</TableCell>
              <TableCell>
                <div className="flex gap-2 text-xs">
                  {item.isFeatured && <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Featured</span>}
                  {item.isPopular && <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Popular</span>}
                </div>
              </TableCell>
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
