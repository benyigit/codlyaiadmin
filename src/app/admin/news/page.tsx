"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function NewsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/news").then(r => r.json()).then(setItems);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (editingItem?.id) {
      await fetch(`/api/news/${editingItem.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
    } else {
      await fetch("/api/news", {
        method: "POST",
        body: JSON.stringify(data)
      });
    }
    
    setIsOpen(false);
    setEditingItem(null);
    fetch("/api/news").then(r => r.json()).then(setItems);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    fetch("/api/news").then(r => r.json()).then(setItems);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News</h1>
        <Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Add New</Button><Dialog open={isOpen} onOpenChange={setIsOpen}>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} News</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="title">title</Label>
                <Input id="title" name="title" defaultValue={editingItem?.title || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">summary</Label>
                <Input id="summary" name="summary" defaultValue={editingItem?.summary || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">tag</Label>
                <Input id="tag" name="tag" defaultValue={editingItem?.tag || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateLabel">dateLabel</Label>
                <Input id="dateLabel" name="dateLabel" defaultValue={editingItem?.dateLabel || ""} />
              </div>
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>title</TableHead><TableHead>summary</TableHead><TableHead>tag</TableHead><TableHead>dateLabel</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell><TableCell>{item.summary}</TableCell><TableCell>{item.tag}</TableCell><TableCell>{item.dateLabel}</TableCell>
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
