const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const faqs = [
    {
        question: "What is the Achievers Summit conference and why is everyone talking about it?",
        answer: "The Achievers Summit is one of Emmanuel Agida International (EAi) flagship leadership and entrepreneurship platform’s where Africa’s emerging leaders, entrepreneurs, and change-makers come together to learn, connect, and level up.\nThink of learning, connecting, and growing all in one place."
    },
    {
        question: "Who can attend the Achievers Summit conference?",
        answer: "Are you passionate about growth, and making an impact in shaping Africa’s future? This Summit is for YOU. Whether you’re a student, creative, young professional, entrepreneur, innovator, policymaker, or corporate leader."
    },
    {
        question: "Do I need to already be “made” to attend?",
        answer: "The Achievers summit conference is for anyone becoming an achiever, not just those who are already made."
    },
    {
        question: "What makes the Achievers Summit conference Unique/special?",
        answer: "This is more than just talks. This is a mix of leadership, entrepreneurship, policy, creativity, and real opportunities. A forum where ideas will meet action and people meet opportunities.\nYou’ll leave not just inspired but ready to act. You definitely don’t want to miss it!"
    },
    {
        question: "When and where will the Achievers summit conference hold?",
        answer: "The Achievers summit conference will be held in Lagos, Nigeria on 11th - 12th August, 2026. Time and final venue details will be officially announced to attendees."
    },
    {
        question: "What tangible value will I get from attending?",
        answer: "You stand the chance to gain practical skills, connections, mentorship, insights into policy and business, career pathways, and get direct access to decision makers, the impact is enormous.\nThis is where your next big move can start. Come see for yourself!"
    },
    {
        question: "Who are the speakers and mentors?",
        answer: "A list of experienced leaders across business, governance, innovation, and the creative economy. People actively shaping Africa’s narrative. Visit; www.achieverssummit.com.ng/speakers for more updates coming soon."
    },
    {
        question: "Can I volunteer for this conference?",
        answer: "Yes. We're seeking result driven volunteers for structured roles. Individuals looking to gain hands-on experience and behind the scene access to a high-impact Summit. Visit; www.achieverssummit.com.ng to volunteer."
    },
    {
        question: "Is there an ambassadorship opportunity?",
        answer: "Yes. Passionate young leaders can apply to become Achievers Summit Ambassadors via; www.achieversummit.com.ng/community"
    },
    {
        question: "Will there be networking opportunity?",
        answer: "Certainly. The summit is designed for meaningful connections and collaborations. Expect meaningful conversations and collaborations with mentors, investors, policymakers, and attendees during the conference."
    },
    {
        question: "Is there a nomination opportunity at The Achievers Summit?",
        answer: "Yes. The Summit allows the public to nominate outstanding young leaders and changemakers for recognition. Nominations can be submitted via; www.achieverssummit.com.ng"
    },
    {
        question: "Is entry free or paid?",
        answer: "There are different ticket classes— (from REGULAR to EXCLUSIVE BIZJET), you can choose what works for you. Your ticket class gives access to Keynote & plenary sessions, masterclasses, exhibition arena, deal rooms, a Private Dinner & Award Night, and the conference full experience. Secure your spot now!"
    },
    {
        question: "How do I register?",
        answer: "To register, visit www.achieverssummit.com.ng. Please note there is limited slots capacity of 5000+ Physical Attendees & 25000+Virtual Audience. So hurry now to secure your spot."
    },
    {
        question: "Can I attend even if I’m not in Lagos?",
        answer: "Yes. There are virtual participation options for attendees outside Lagos or Nigeria. The 2026 edition blends physical participation with digital amplification. You can join from anywhere."
    }
];

const productUnits = [
    "Graphics & Creative Design", "Photography", "Videography", "Web Development",
    "Content Development", "Copy Writing", "Customer / Call Representation",
    "Data Analysis", "Livestream Operation", "Ambiance & Decoration",
    "Social Media Management", "Sound Production", "Stage & Lighting",
    "Digital Marketing"
];

const serviceUnits = [
    "Ushering", "Protocol", "Welfare", "Transportation & Mobility",
    "Registration & Check-In", "Merchandise & Branding", "Security & Crowd Management",
    "First Aid & Emergency Support"
];

const institutions = [
    "Lagos State University (LASU)", "University of Lagos (UNILAG)", "Caleb University",
    "Anchor University", "Augustine University", "Pan Atlantic University",
    "James Hope University", "Eko University of Medical and Health Sciences",
    "Mountain Top University", "National Open University of Nigeria",
    "Lagos State University of Education",
    "Lagos State University of Science and Technology Ikorodu (Government)", "Other"
];

const statuses = [
    { label: "Undergraduate", category: "Academic" },
    { label: "Professional", category: "Legacy" }
];

async function seed() {
    try {
        console.log('🌱 Seeding CMS data...');

        // Seed FAQs
        for (const item of faqs) {
            await prisma.fAQ.create({ data: item });
        }
        console.log('✅ Seeded FAQs');

        // Seed Units
        for (const name of productUnits) {
            await prisma.volunteerUnit.create({ data: { section: 'PRODUCT', name } });
        }
        for (const name of serviceUnits) {
            await prisma.volunteerUnit.create({ data: { section: 'SERVICE', name } });
        }
        console.log('✅ Seeded Volunteer Units');

        // Seed Institutions
        for (const name of institutions) {
            await prisma.institution.create({ data: { name, isLagos: true } });
        }
        console.log('✅ Seeded Institutions');

        // Seed Statuses
        for (const item of statuses) {
            await prisma.ambassadorStatus.create({ data: item });
        }
        console.log('✅ Seeded Ambassador Statuses');

        console.log('🚀 Seeding complete!');
    } catch (error) {
        console.error('❌ Error seeding:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
