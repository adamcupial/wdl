export default class TimeChanger {
  __root: HTMLElement;

  constructor(root=document.body) {
    this.__root = root;
    const changes = [...this.getElements()]
      .map(tag => this.applyTime(tag));

    window.requestAnimationFrame(() => {
      changes
        .forEach(([element, timestr]) => {
          element.innerHTML = timestr;
        });
    })
  }

  private getElements(): NodeListOf<HTMLTimeElement> {
    return this.__root.querySelectorAll('time[datetime]');
  }

  private applyTime(tag: HTMLTimeElement) : [HTMLTimeElement, string] {
    const date = new Date(tag.dateTime);

    if (tag.dataset.format) {
      return [tag, this[`format_${tag.dataset.format}`](date)];
    } else {
      return [tag, this.format_local(date)];
    }
  }

  public format_local(date: Date) : string {
    if (Intl.DateTimeFormat) {
      const formatter = new Intl.DateTimeFormat('en', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      });
      return formatter.format(date);
    } else {
      return date.toLocaleDateString();
    }
  }

  private format_rtf(num: number, unit: string) : string {
    if (Intl.RelativeTimeFormat) {
      return new Intl.RelativeTimeFormat('en', {
          numeric: 'auto',
        })
        .format(-1 * num, unit);
    } else {
      return `${num} ${unit}${num > 1 ? 's' : ''} ago`;
    }
  }

  public format_timeago(date: Date) : string {
    const diff = new Date().getTime() - date.getTime();
    const days = Math.floor(diff / 24 / 60 / 60 / 1000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (months > 0) {
      return this.format_local(date);
    } else if (weeks > 0) {
      return this.format_rtf(weeks, 'week');
    } else {
      return this.format_rtf(days, 'day');
    }
  }
}
