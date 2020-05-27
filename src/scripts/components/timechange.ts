import { sanitize } from './sanitize';

export default class TimeChanger {

  constructor(root = document.body) {
    const changes = Array.from(root.querySelectorAll('time[datetime]'))
      .map(tag => this.applyTime(tag));

    window.requestAnimationFrame(() => {
      changes
        .forEach(([element, timestr]) => {
          element.innerHTML = sanitize(timestr);
        });
    });
  }

  private applyTime(tag: HTMLTimeElement) : [HTMLTimeElement, string] {
    const date = new Date(tag.dateTime);

    if (tag.dataset.format) {
      return [tag, this[`format_${tag.dataset.format}`](date)];
    }
    return [tag, this.format_local(date)];
  }

  public format_local(date: Date) : string {
    if (Intl.DateTimeFormat) {
      const formatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      });
      return formatter.format(date);
    }
    return date.toLocaleDateString();
  }

  private format_rtf(num: number, unit: string) : string {
    if (Intl.RelativeTimeFormat) {
      return new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
      })
      .format(-1 * num, unit);
    }
    return `${num} ${unit}${num > 1 ? 's' : ''} ago`;
  }

  public format_timeago(date: Date) : string {
    const diff = new Date().getTime() - date.getTime();
    const days = Math.floor(diff / 24 / 60 / 60 / 1000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (months > 0) {
      return this.format_local(date);
    }

    if (weeks > 0) {
      return this.format_rtf(weeks, 'week');
    }

    return this.format_rtf(days, 'day');
  }
}
