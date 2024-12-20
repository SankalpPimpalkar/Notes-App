/* eslint-disable @typescript-eslint/no-explicit-any */
export default function formatMongoDate(mongoDate: any) {
    const date = new Date(mongoDate);

    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
}
