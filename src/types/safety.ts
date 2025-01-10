/**
 * @fileoverview TypeScript interface definitions for safety protocols
 * @project     Steroid Guide Site
 * @module      types/safety
 */

export interface TooltipItem {
  name: string;
  tooltip: string;
}

export interface EmergencyProtocols {
  symptoms: string[];
  actions: string[];
}

export interface Equipment {
  injectionSupplies: TooltipItem[];
  safetyEquipment: TooltipItem[];
}

export interface SafetyData {
  bloodwork: TooltipItem[];
  healthMarkers: TooltipItem[];
  emergencyProtocols: EmergencyProtocols;
  equipment: Equipment;
  preventiveMeasures: TooltipItem[];
}
