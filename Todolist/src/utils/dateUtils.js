import { format, isToday, isThisWeek, isThisMonth, isPast } from "date-fns";

export const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "MMM dd, yyyy");
};

export const isOverdue = (date) => {
  if (!date) return false;
  return isPast(new Date(date));
};

export const getDateFilter = (date, filter) => {
  if (!date) return false;
  const taskDate = new Date(date);

  switch (filter) {
    case "overdue":
      return isOverdue(date);
    case "today":
      return isToday(taskDate);
    case "thisWeek":
      return isThisWeek(taskDate);
    case "thisMonth":
      return isThisMonth(taskDate);
    default:
      return true;
  }
};
