import { supabase } from './supabase';

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  boatId: string | null;
  boatTitle: string;
  collection: string;
  desiredDate: string;
  message?: string;
}

export async function createReservation(data: ReservationData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[Reservations] Creating reservation:', data);

    const { error } = await supabase
      .from('reservations')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        boat_id: data.boatId,
        boat_title: data.boatTitle,
        collection: data.collection,
        desired_date: data.desiredDate,
        message: data.message || null,
      });

    if (error) {
      console.error('[Reservations] Error creating reservation:', error);
      return { success: false, error: error.message };
    }

    console.log('[Reservations] Reservation created successfully');
    return { success: true };
  } catch (error) {
    console.error('[Reservations] Error in createReservation:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export function createWhatsAppMessage(data: ReservationData): string {
  const date = new Date(data.desiredDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let message = `¡Hola! Me gustaría hacer una reserva:\n\n`;
  message += `*Nombre:* ${data.name}\n`;
  message += `*Email:* ${data.email}\n`;
  message += `*Teléfono:* ${data.phone}\n`;
  message += `*Colección:* ${data.collection}\n`;
  
  if (data.boatTitle) {
    message += `*Bote:* ${data.boatTitle}\n`;
  }
  
  message += `*Fecha deseada:* ${date}\n`;
  
  if (data.message) {
    message += `*Mensaje:* ${data.message}\n`;
  }

  return encodeURIComponent(message);
}
