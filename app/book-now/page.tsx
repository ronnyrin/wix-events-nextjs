import { cookies } from "next/headers";
import styles from "./page.module.css";
import { startOfDay, endOfDay, parseJSON, format } from "date-fns";

export default async function BookNowPage() {
  const {sessions, pagingMetadata} = await getSessionInDay(new Date());

  console.log(parseJSON(sessions[0].start.timestamp))

  return (
    <>
      <section className={styles.hero}>
        <h1>Book Now</h1>
      </section>
      <div>
        {sessions.map((session, index) => (<div key={index}>
            <h2>{session.title}</h2>
            <div>Time: {format(parseJSON(session.start.timestamp), 'HH:mm')}</div>
            <div>Duration: </div>
            <div>Staff member: </div>
            <div>Available spots: </div>
            <div><button>Book Now</button></div>
        </div>))}
      </div>
    </>
  );
}

async function getSessionInDay(date: Date): Promise<{sessions: Session[], pagingMetadata: PagingMetadata}> {
  const nextCookies = cookies();

  return fetch(
    "https://www.wixapis.com/bookings/v2/calendar/sessions/query",
    {
      method: "POST",
      headers: {
        Cookie: "svSession=" + nextCookies.get("wixSession"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromDate: startOfDay(date).toISOString(),
        toDate: endOfDay(date).toISOString(),
        query: {},
      }),
    }
  ).then((res) => res.json());
}

type WixDate = {
    timestamp: string;
}

type Session = {
    title: string;
    start: WixDate,
    end: WixDate
}
type PagingMetadata = {}

function getSessionDuration(session: Session) {
    return parseJSON(session.start.timestamp)
}