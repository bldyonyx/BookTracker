import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

function Dashboard() {
  return (
    <div className="p-6">
      <Card>
        <h2 className="font-heading text-xl text-darkwood">
          Test Card
        </h2>

        <p className="font-ui text-darkwood">
          Ceci est une card de test.
        </p>
      </Card>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button>
          Ajouter à ma bibliothèque
        </Button>

        <Button variant="secondary">
          Voir la fiche
        </Button>
      </div>

      <div className="mt-4 max-w-md">
        <Input
        id="test-search"
        type="search"
        placeholder="Rechercher un livre..."
        />
      </div>
    </div>
  )
}

export default Dashboard