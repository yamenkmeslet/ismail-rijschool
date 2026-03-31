import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 px-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Pagina niet gevonden</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de startpagina.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Startpagina
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/app/dashboard">
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
