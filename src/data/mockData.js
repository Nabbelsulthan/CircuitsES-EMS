export const initialMeters = [
  { id: "MTR-001", name: "Main Incomer", location: "Electrical Room A", type: "Power meter", status: "Online", voltage: 415.2, current: 128.4, power: 78.6, pf: 0.97, energy: 18462.8, lastSeen: "Just now" },
  { id: "MTR-002", name: "Production Line 01", location: "Production Hall", type: "Power meter", status: "Online", voltage: 412.8, current: 76.2, power: 46.8, pf: 0.95, energy: 9238.4, lastSeen: "Just now" },
  { id: "MTR-003", name: "Production Line 02", location: "Production Hall", type: "Power meter", status: "Online", voltage: 414.1, current: 54.8, power: 32.4, pf: 0.96, energy: 7821.2, lastSeen: "12 sec ago" },
  { id: "MTR-004", name: "HVAC Panel", location: "Utility Block", type: "Power meter", status: "Online", voltage: 416.3, current: 31.6, power: 18.6, pf: 0.92, energy: 5149.7, lastSeen: "18 sec ago" },
  { id: "MTR-005", name: "Utility Meter", location: "Compressor Room", type: "Power meter", status: "Offline", voltage: null, current: null, power: null, pf: null, energy: 3260.5, lastSeen: "14 min ago" },
];

export const initialAlerts = [
  { id: "ALT-1042", severity: "Critical", title: "Meter communication lost", source: "Utility Meter · MTR-005", time: "10:42:18", date: "Today", acknowledged: false, detail: "No reading received within the expected interval." },
  { id: "ALT-1041", severity: "Warning", title: "Power factor below threshold", source: "HVAC Panel · MTR-004", time: "10:36:02", date: "Today", acknowledged: false, detail: "Power factor measured at 0.92 against a configured threshold of 0.95." },
  { id: "ALT-1040", severity: "Info", title: "Daily report generated", source: "Plant 01", time: "09:00:00", date: "Today", acknowledged: true, detail: "The simulated daily energy report is ready." },
  { id: "ALT-1039", severity: "Warning", title: "High demand detected", source: "Main Incomer · MTR-001", time: "08:48:33", date: "Today", acknowledged: true, detail: "Demand briefly exceeded the demo threshold." },
  { id: "ALT-1038", severity: "Info", title: "Dashboard session started", source: "Local prototype", time: "08:30:00", date: "Today", acknowledged: true, detail: "A local demo session was started." },
];

export const consumptionData = [
  { time: "00:00", energy: 34 }, { time: "02:00", energy: 29 }, { time: "04:00", energy: 25 },
  { time: "06:00", energy: 42 }, { time: "08:00", energy: 76 }, { time: "10:00", energy: 89 },
  { time: "12:00", energy: 83 }, { time: "14:00", energy: 94 }, { time: "16:00", energy: 86 },
  { time: "18:00", energy: 67 }, { time: "20:00", energy: 53 }, { time: "22:00", energy: 41 },
];

export const demandData = [
  { time: "06:00", demand: 32 }, { time: "07:00", demand: 44 }, { time: "08:00", demand: 68 },
  { time: "09:00", demand: 83 }, { time: "10:00", demand: 78 }, { time: "11:00", demand: 91 },
  { time: "12:00", demand: 75 }, { time: "13:00", demand: 86 }, { time: "14:00", demand: 96 },
  { time: "15:00", demand: 88 }, { time: "16:00", demand: 72 }, { time: "17:00", demand: 58 },
];

export const reportRows = [
  { date: "2026-10-16", label: "Fri", energy: 1124.6, peak: 192.4, avgPf: 0.96, cost: 8996.8 },
  { date: "2026-10-17", label: "Sat", energy: 986.2, peak: 176.8, avgPf: 0.97, cost: 7889.6 },
  { date: "2026-10-18", label: "Sun", energy: 742.8, peak: 139.2, avgPf: 0.98, cost: 5942.4 },
  { date: "2026-10-19", label: "Mon", energy: 1284.6, peak: 208.5, avgPf: 0.95, cost: 10276.8 },
  { date: "2026-10-20", label: "Tue", energy: 1198.3, peak: 201.6, avgPf: 0.96, cost: 9586.4 },
  { date: "2026-10-21", label: "Wed", energy: 1246.9, peak: 214.1, avgPf: 0.95, cost: 9975.2 },
  { date: "2026-10-22", label: "Thu", energy: 1284.6, peak: 208.5, avgPf: 0.96, cost: 10276.8 },
];

export const users = [
  { id: "USR-001", name: "Nabbel", email: "nabbel@example.com", role: "Administrator", status: "Active", lastActive: "Just now", initials: "AK" },
  { id: "USR-002", name: "Bitsol", email: "bitsol@example.com", role: "Energy Manager", status: "Active", lastActive: "18 min ago", initials: "PR" },
  { id: "USR-003", name: "Test User", email: "test.user@example.com", role: "Operator", status: "Active", lastActive: "1 hour ago", initials: "KS" },
  { id: "USR-004", name: "Demo Viewer", email: "viewer@example.com", role: "Viewer", status: "Invited", lastActive: "Never", initials: "DV" },
];

export const mockReadings = {
  totalEnergy: 1284.6,
  activePower: 186.4,
  powerFactor: 0.96,
  demand: 208.5,
};
