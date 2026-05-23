import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {IEvent} from "@/database/event.model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseStringify(value: IEvent) {
  return JSON.parse(JSON.stringify(value));
}
