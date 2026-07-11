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
    fetch("/api/news").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setItems(data);
      else { console.error(data); setItems([]); }
    }).catch(() => setItems([]));
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
    fetch("/api/news").then(r => r.json()).then(data => setItems(Array.isArray(data) ? data : []));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    fetch("/api/news").then(r => r.json()).then(data => setItems(Array.isArray(data) ? data : []));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">News</h1>
        <Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Add New</Button><Dialog open={isOpen} onOpenChange={setIsOpen}>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} News</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">Title (EN)</Label>
                  <Input id="title" name="title" defaultValue={editingItem?.title || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleTR">Title (TR)</Label>
                  <Input id="titleTR" name="titleTR" defaultValue={editingItem?.titleTR || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleDE">Title (DE)</Label>
                  <Input id="titleDE" name="titleDE" defaultValue={editingItem?.titleDE || ""} />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="summary">Summary (EN)</Label>
                  <Input id="summary" name="summary" defaultValue={editingItem?.summary || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summaryTR">Summary (TR)</Label>
                  <Input id="summaryTR" name="summaryTR" defaultValue={editingItem?.summaryTR || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summaryDE">Summary (DE)</Label>
                  <Input id="summaryDE" name="summaryDE" defaultValue={editingItem?.summaryDE || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tag">Tag (EN)</Label>
                  <Input id="tag" name="tag" defaultValue={editingItem?.tag || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateLabel">Date Label (EN)</Label>
                  <Input id="dateLabel" name="dateLabel" defaultValue={editingItem?.dateLabel || ""} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagTR">Tag (TR)</Label>
                  <Input id="tagTR" name="tagTR" defaultValue={editingItem?.tagTR || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateLabelTR">Date Label (TR)</Label>
                  <Input id="dateLabelTR" name="dateLabelTR" defaultValue={editingItem?.dateLabelTR || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagDE">Tag (DE)</Label>
                  <Input id="tagDE" name="tagDE" defaultValue={editingItem?.tagDE || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateLabelDE">Date Label (DE)</Label>
                  <Input id="dateLabelDE" name="dateLabelDE" defaultValue={editingItem?.dateLabelDE || ""} />
                </div>
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
