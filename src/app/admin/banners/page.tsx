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
    fetch("/api/banners").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setItems(data);
      else { console.error(data); setItems([]); }
    }).catch(() => setItems([]));
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
    fetch("/api/banners").then(r => r.json()).then(data => setItems(Array.isArray(data) ? data : []));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    fetch("/api/banners").then(r => r.json()).then(data => setItems(Array.isArray(data) ? data : []));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Banners</h1>
        <Button onClick={() => { setEditingItem(null); setIsOpen(true); }}>Add New</Button><Dialog open={isOpen} onOpenChange={setIsOpen}>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit" : "Add"} Banners</DialogTitle>
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
                  <Label htmlFor="subtitle">Subtitle (EN)</Label>
                  <Input id="subtitle" name="subtitle" defaultValue={editingItem?.subtitle || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitleTR">Subtitle (TR)</Label>
                  <Input id="subtitleTR" name="subtitleTR" defaultValue={editingItem?.subtitleTR || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitleDE">Subtitle (DE)</Label>
                  <Input id="subtitleDE" name="subtitleDE" defaultValue={editingItem?.subtitleDE || ""} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol (SF Symbol Name)</Label>
                  <Input id="symbol" name="symbol" defaultValue={editingItem?.symbol || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedModelID">Linked Model ID</Label>
                  <Input id="linkedModelID" name="linkedModelID" defaultValue={editingItem?.linkedModelID || ""} />
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
