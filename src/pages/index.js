
import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Trash2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://esniolbepwedzgwisbqf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbmlvbGJlcHdlZHpnd2lzYnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NzEyMDQsImV4cCI6MjA2NTE0NzIwNH0.fHkQLt1eIsTmUg2zGvnGuK67E-qSWdu59P9Fg00lGe8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TattooInventoryApp() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", quantity: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
    if (!error) setItems(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    if (!form.name || !form.quantity) return;
    const { error } = await supabase.from("materials").insert([form]);
    if (!error) fetchItems();
    setForm({ name: "", category: "", quantity: "" });
  };

  const removeItem = async (id) => {
    const { error } = await supabase.from("materials").delete().eq("id", id);
    if (!error) fetchItems();
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-bold text-center">📦 Материалы для тату</h1>

      <div className="space-y-2">
        <Label>Название</Label>
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Пигмент, иглы и т.д." />

        <Label>Категория</Label>
        <Input name="category" value={form.category} onChange={handleChange} placeholder="Например: Пигмент" />

        <Label>Количество</Label>
        <Input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Например: 3 шт" />

        <Button className="w-full mt-2" onClick={addItem}>Добавить</Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="flex items-center justify-between">
            <CardContent className="w-full">
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.category}</span>
                <span className="text-sm">Количество: {item.quantity}</span>
              </div>
            </CardContent>
            <Button onClick={() => removeItem(item.id)} className="ml-2 px-2 py-1 bg-red-500 hover:bg-red-600">
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
