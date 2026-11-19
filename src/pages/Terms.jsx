import { LegalPage } from '../components/organisms/LegalPage'
import { terms } from '../data/legal'

export default function Terms() {
  return <LegalPage doc={terms} eyebrow="Legal" otherLink={{ to: '/privacy', label: 'Read our Privacy Policy' }} />
}
