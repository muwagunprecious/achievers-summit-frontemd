const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLabels() {
    console.log('UPDATING TICKET LABELS (V3 - Refinement)...');
    try {
        const economyCategory = await prisma.ticketCategory.findFirst({
            where: { name: 'ECONOMY' }
        });

        if (economyCategory) {
            const newFeatures = economyCategory.features.map(feature => {
                if (feature.toLowerCase().includes('transportation')) {
                    return 'transportation at Designated location';
                }
                return feature;
            });

            await prisma.ticketCategory.update({
                where: { id: economyCategory.id },
                data: { features: newFeatures }
            });
            console.log(`✅ Updated features for: ${economyCategory.name}`);
        } else {
            console.log('⚠️ Economy category not found');
        }
        console.log('DONE.');
    } catch (error) {
        console.error('❌ Error updating labels:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updateLabels();
