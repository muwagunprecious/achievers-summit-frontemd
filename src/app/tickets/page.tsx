import TicketPurchaseShell from "../components/tickets/TicketPurchaseShell";
import TicketsPage from "../../imports/Tickets";

export default function Page() {
  return (
    <TicketPurchaseShell>
      <TicketsPage />
    </TicketPurchaseShell>
  );
}
