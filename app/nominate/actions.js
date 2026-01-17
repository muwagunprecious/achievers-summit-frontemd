"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitNomination(formData) {
    const rawData = {
        nomineeName: formData.get('nomineeName'),
        category: formData.get('category'),
        description: formData.get('reason'),
        nomineeEmail: formData.get('nomineeEmail'),
        nomineePhone: formData.get('nomineePhone'),
        nomineeWhatsApp: formData.get('nomineeWhatsApp'),
        nomineeTwitter: formData.get('nomineeTwitter'),
        nomineeLinkedIn: formData.get('nomineeLinkedIn'),
        nomineeInstagram: formData.get('nomineeInstagram'),
        nominatorName: formData.get('nominatorName'),
        nominatorEmail: formData.get('nominatorEmail'),
        id: 'nom_' + Math.random().toString(36).substr(2, 9), // Prisma schema requires ID but it's not autoincrement
    };

    try {
        await prisma.nomination.create({
            data: rawData
        });

        // No path to revalidate immediately as it goes to admin, but good practice
        revalidatePath('/admin/dashboard/nominees');
        return { success: true };
    } catch (error) {
        console.error("Failed to submit nomination:", error);
        return { success: false, error: "Failed to submit nomination. Please try again." };
    }
}
