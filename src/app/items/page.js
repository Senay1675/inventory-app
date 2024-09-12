// API-förfrågan: En förfrågan görs till /api/items/ för att hämta data om alla "items".

// Rendering: När datan har hämtats:
// Listan över items visas i ItemCard-komponenter.

// Ett formulär (ItemForm) visas för att skapa nya "items".
// Detta ger en komplett vy för att visa existerande items och lägga till nya items i din applikation.

import AuthForm from "@/components/AuthForm";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";
import ItemList from "@/components/ItemList";

export default async function Home() {
  // const items = await fetch("http://localhost:3002/api/items/")
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.log("failed to get items", error);
  //   });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Bytt ut BookForm mot ItemForm */}
      Items
      <section className="flex flex-col items-center justify-center gap-2">
        <ItemList />
      </section>
    </main>
  );
}
