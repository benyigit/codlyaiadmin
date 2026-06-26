"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function BannersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/banners").then(r => r.json()).then(setItems);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (editingItem?.id) {
      await fetch(`/api/banners/${editingItem.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
    } else {
      await fetch("/api/banners", {
        method: "POST",
        body: JSON.stringify(data)
      });
    }
    
    setIsOpen(false);
    setEditingItem(null);
    fetch("/api/banners").then(r => r.json()).then(setItems);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    fetch("/api/banners").then(r => r.json()).then(setItems);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banners</h1>
        <Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Add New</Button><Dialog open={isOpen} onOpenChange={setIsOpen}>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Banners</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="title">title</Label>
                <Input id="title" name="title" defaultValue={editingItem?.title || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">subtitle</Label>
                <Input id="subtitle" name="subtitle" defaultValue={editingItem?.subtitle || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol">symbol</Label>
                <Input id="symbol" name="symbol" defaultValue={editingItem?.symbol || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedModelID">linkedModelID</Label>
                <Input id="linkedModelID" name="linkedModelID" defaultValue={editingItem?.linkedModelID || ""} />
              </div>
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>title</TableHead><TableHead>subtitle</TableHead><TableHead>symbol</TableHead><TableHead>linkedModelID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell><TableCell>{item.subtitle}</TableCell><TableCell>{item.symbol}</TableCell><TableCell>{item.linkedModelID}</TableCell>
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
