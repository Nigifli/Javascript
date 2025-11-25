export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateTotal = (pricePerNight: number, checkIn: string, checkOut: string): number => {
  return pricePerNight * calculateNights(checkIn, checkOut);
};
