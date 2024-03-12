export const DateUtils = {
    /**
 * Converts a Date object to a string in the format "DD-MM-YYYY".
 * @param date The Date object to convert.
 * @returns A string representation of the date in "DD-MM-YYYY" format.
 */
    fromDateToString(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    },

    /**
* Converts a String to a Date object in the format "DD-MM-YYYY".
* @param dateString The string to format.
* @returns A Date object in "DD-MM-YYYY" format.
*/
    fromStringToDate(dateString: string): Date {
        const [day, month, year] = dateString.split('-').map(str => parseInt(str, 10));
        return new Date(year, month - 1, day);
    },
    /**
     * Adds a specified number of days to a Date object.
     * @param date The Date object to add days to.
     * @param days The number of days to add.
     * @returns A new Date object with the specified number of days added.
     */
    addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    /**
     * Calculates the difference between two Date objects in days.
     * @param startDate The start date.
     * @param endDate The end date.
     * @returns The number of days between the start and end dates.
     */
    getDateDiffInDays(startDate: Date, endDate: Date): number {
        const diffInMs = endDate.getTime() - startDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
    }

}