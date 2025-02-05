import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("");

  const fetchMetadata = async (link) => {
    try {
      const response = await fetch(`https://api.linkpreview.net/?key=YOUR_API_KEY&q=${link}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching metadata", error);
      return null;
    }
  };

  const addItem = async () => {
    if (!url) return;
    const metadata = await fetchMetadata(url);
    if (metadata) {
      setItems([...items, metadata]);
      setUrl("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Shopping Wish List</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste product link here"
        />
        <Button onClick={addItem}>Add</Button>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-2 flex gap-4 items-center">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {item.title}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
