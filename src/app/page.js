import AuthForm from "@/components/AuthForm";
import ItemCard from "../components/ItemCard";


export default async function Home() {

  return (
    <main className="min-h-screen w-full">
      Login
      <AuthForm/>
    </main>
  )
}