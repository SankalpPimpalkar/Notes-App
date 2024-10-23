/* eslint-disable @typescript-eslint/no-explicit-any */
export default function formatMongoDate(mongoDate: any) {
    const date = new Date(mongoDate);
    console.log("Date", date)

    // Options for formatting the date
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    // Use toLocaleDateString to format the date
    return date.toLocaleDateString('en-US', options);
}
