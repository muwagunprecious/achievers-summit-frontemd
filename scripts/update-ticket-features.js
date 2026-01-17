const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTicketFeatures() {
    try {
        console.log('Updating First Class Pass features...');
        await prisma.ticketCategory.update({
            where: { id: 'cat_firstclass' },
            data: {
                name: 'FIRST CLASS PASS',
                features: [
                    'VVIP Access for both days',
                    'Reserved Front Row VVIP Seating in the Main Hall',
                    'Three-course buffet lunch on both days',
                    'Access to the VVIP Lounge',
                    'Access to the VVIP Private Dinner & Award Night',
                    'One-night Executive Hotel Accommodation',
                    'Executive chauffeured transportation (Hotel ↔ Venue) with VVIP fast-track entry',
                    'Gold-framed Certificate of Participation',
                    'Exclusive First Class Souvenir Pack',
                    'Access to the VVIP Deal Room and Meet-and-Greet sessions with Speakers and Special Dignitaries',
                    'CPD-Accredited Leadership Certificate',
                    'Access to Post-Summit Digital Resource Hub (Recorded keynote sessions, toolkits, mentorship materials)',
                    'Exclusive Red Carpet Photo Session (Media wall + branded experience)',
                    '3 – 6 Months Membership in the EA International Elite Network (Access to exclusive leadership circles, mentorship calls, and quarterly masterclasses)',
                    'Priority Invitation to Future EAI Events, Missions, and Delegations',
                    'Policy Brief / Economic Report on Youth Leadership Trends'
                ]
            }
        });
        console.log('✅ First Class Pass updated (16 features)');

        console.log('Updating Exclusive BizJet Pass features...');
        await prisma.ticketCategory.update({
            where: { id: 'cat_bizjet' },
            data: {
                name: 'EXCLUSIVE BIZJET PASS',
                description: 'Ultimate elite privileges (Limited to 5 Slots Only).',
                features: [
                    'Unrestricted VVIP Access for both days of the Summit',
                    'Three-course buffet lunch on both days',
                    'Access to the Speakers, Partners & Special Guests VVIP Lounge',
                    'VVIP access to the Private Dinner & Special Awards Night',
                    'Executive chauffeured SUV experience and Red Carpet Entry at the Gala Night',
                    'Reserved Priority VVIP Seating',
                    'VVIP fast-track entry with full Protocol Services',
                    'Exclusive access to Premium VVIP Lounge with refreshments and private meeting areas',
                    'Luxury VVIP Gift Box',
                    'Priority Airport Shuttle Service and Reserved Parking Space',
                    'Dedicated Personal Event Assistant',
                    'Complimentary VVIP Attaché Pass for a personal aide (Non-transferable)',
                    'High-level receptions with international guests, global leaders, and keynote speakers',
                    '25% discount on additional tickets for family and friends',
                    'Priority access to the Deal Room as an Investor or Corporate Delegate with scheduled introductions',
                    'Partner Gold Award Trophy',
                    'Media interviews spotlighting your personal and corporate brand after the event',
                    '10% discount on official Summit merchandise',
                    'Opportunity to host approved side-events',
                    'CPD-Accredited Leadership Certification',
                    'Premium Exhibition Arena allocation for company, brand, or product showcase',
                    'Exclusive Recognition as a Summit VVIP Partner on all event materials and communique—digital, print, and ceremonial mentions',
                    '6 – 12 Months Membership in the EA International Elite Network (Access to exclusive leadership circles, mentorship calls, and quarterly masterclasses)',
                    'Access to Post-Summit Digital Resource Hub (Recorded keynote sessions, toolkits, mentorship materials)',
                    'Priority Invitation to Future EAI Events, Missions, and Delegations',
                    'Priority Invitation to Closed-Door Policy Roundtables (National leaders, CEOs, diplomats)',
                    'Physical Book authored by the Convener or selected speakers',
                    'Policy Brief / Economic Report on Youth Leadership Trends'
                ]
            }
        });
        console.log('✅ Exclusive BizJet Pass updated (27 features)');

        console.log('\n✅ All ticket features updated successfully!');
    } catch (error) {
        console.error('❌ Error updating ticket features:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateTicketFeatures();
