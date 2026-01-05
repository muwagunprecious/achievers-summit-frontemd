const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLabels() {
    console.log('UPDATING TICKET LABELS...');
    try {
        const categories = await prisma.ticketCategory.findMany();

        for (const cat of categories) {
            let updated = false;
            const newFeatures = cat.features.map(feature => {
                if (feature.toLowerCase().includes('free transportation')) {
                    updated = true;
                    return 'Transportation to Venue (Designated Bus Stops)';
                }
                return feature;
            });

            if (updated) {
                await prisma.ticketCategory.update({
                    where: { id: cat.id },
                    data: { features: newFeatures }
                });
                console.log(`✅ Updated features for: ${cat.name}`);
            }
        }
        console.log('DONE.');
    } catch (error) {
        console.error('❌ Error updating labels:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateLabels();
