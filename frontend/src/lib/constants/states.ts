export interface IndianState {
  name: string;
  abbr: string;
  code: number;
}

export const INDIAN_STATES: Record<number, IndianState> = {
  1: { name: "Andhra Pradesh", abbr: "AP", code: 1 },
  2: { name: "Arunachal Pradesh", abbr: "AR", code: 2 },
  3: { name: "Assam", abbr: "AS", code: 3 },
  4: { name: "Bihar", abbr: "BR", code: 4 },
  5: { name: "Chhattisgarh", abbr: "CG", code: 5 },
  6: { name: "Goa", abbr: "GA", code: 6 },
  7: { name: "Gujarat", abbr: "GJ", code: 7 },
  8: { name: "Haryana", abbr: "HR", code: 8 },
  9: { name: "Himachal Pradesh", abbr: "HP", code: 9 },
  10: { name: "Jharkhand", abbr: "JH", code: 10 },
  11: { name: "Karnataka", abbr: "KA", code: 11 },
  12: { name: "Kerala", abbr: "KL", code: 12 },
  13: { name: "Madhya Pradesh", abbr: "MP", code: 13 },
  14: { name: "Maharashtra", abbr: "MH", code: 14 },
  15: { name: "Manipur", abbr: "MN", code: 15 },
  16: { name: "Meghalaya", abbr: "ML", code: 16 },
  17: { name: "Mizoram", abbr: "MZ", code: 17 },
  18: { name: "Nagaland", abbr: "NL", code: 18 },
  19: { name: "Odisha", abbr: "OD", code: 19 },
  20: { name: "Punjab", abbr: "PB", code: 20 },
  21: { name: "Rajasthan", abbr: "RJ", code: 21 },
  22: { name: "Sikkim", abbr: "SK", code: 22 },
  23: { name: "Tamil Nadu", abbr: "TN", code: 23 },
  24: { name: "Telangana", abbr: "TG", code: 24 },
  25: { name: "Tripura", abbr: "TR", code: 25 },
  26: { name: "Uttar Pradesh", abbr: "UP", code: 26 },
  27: { name: "Uttarakhand", abbr: "UK", code: 27 },
  28: { name: "West Bengal", abbr: "WB", code: 28 },
  29: { name: "Delhi", abbr: "DL", code: 29 },
  30: { name: "Jammu & Kashmir", abbr: "JK", code: 30 },
  31: { name: "Ladakh", abbr: "LA", code: 31 },
  32: { name: "Chandigarh", abbr: "CH", code: 32 },
  33: { name: "Puducherry", abbr: "PY", code: 33 },
  34: { name: "Andaman & Nicobar", abbr: "AN", code: 34 },
  35: { name: "Dadra Nagar Haveli & Daman Diu", abbr: "DN", code: 35 },
  36: { name: "Lakshadweep", abbr: "LD", code: 36 },
};

export const STATE_LIST = Object.values(INDIAN_STATES).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export function getStateByCode(code: number) {
  return INDIAN_STATES[code];
}

// Major cities per state for the dropdown
export const MAJOR_CITIES: Record<number, string[]> = {
  1: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  4: ["Patna", "Gaya", "Muzaffarpur"],
  6: ["Panaji", "Margao", "Vasco da Gama"],
  7: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  8: ["Gurugram", "Faridabad", "Karnal"],
  11: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  12: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  13: ["Bhopal", "Indore", "Jabalpur", "Gwalior"],
  14: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  19: ["Bhubaneswar", "Cuttack", "Rourkela"],
  20: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  21: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  23: ["Chennai", "Coimbatore", "Madurai", "Salem"],
  24: ["Hyderabad", "Warangal", "Nizamabad"],
  26: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
  27: ["Dehradun", "Haridwar", "Rishikesh"],
  28: ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  29: ["New Delhi", "South Delhi", "Dwarka", "Noida"],
};
