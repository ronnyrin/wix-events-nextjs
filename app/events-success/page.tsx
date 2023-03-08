export default async function Success({ searchParams }: any) {
  if (!searchParams.reservationId) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      reservationId: {searchParams.reservationId}
    </div>
  );
}
