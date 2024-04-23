export const translateDate = (date: string): string => {
  switch(date) {
    case 'today':
      return 'сегодня';
    case 'tomorrow':
      return 'завтра';
    default:
      return date;
  }
};

export const formatPeopleRange = (peopleMin: number, peopleMax: number): string => `${peopleMin}-${peopleMax} чел`;
