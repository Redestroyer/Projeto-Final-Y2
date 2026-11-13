import LoginPage from "./login";

export default function MainPage({}: PageProps<"/">) {
  const authenticated = false;
  if (!authenticated)
    return <LoginPage />

  return (
    <>
    <h1>Aôba</h1>
    <p className="p-4">Claro</p>
    <p className="p-4 bg-gray-800 text-gray-200">Escuro</p>
    </>
  )
}