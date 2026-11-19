import { LegalPage } from '../components/organisms/LegalPage'
import { privacy } from '../data/legal'

export default function Privacy() {
  return <LegalPage doc={privacy} eyebrow="Legal" otherLink={{ to: '/terms', label: 'Read our Terms & Conditions' }} />
}
