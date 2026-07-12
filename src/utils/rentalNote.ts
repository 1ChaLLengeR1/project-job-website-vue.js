import type { PeriodCalculation } from "@/types/api/rentals/periods/types";
import type { Reading } from "@/types/api/rentals/readings/types";
import type { Meter } from "@/types/api/rentals/meters/types";
import type { Apartment } from "@/types/api/rentals/apartments/types";

const SEPARATOR = "///////////////////////////////////////";

// liczby w notatce po polsku — przecinek dziesiętny
const num = (value: number, digits: number = 2): string =>
  value.toFixed(digits).replace(".", ",");

const zl = (value: number): string => `${Math.round(value)}zł`;

type NoteInput = {
  calculation: PeriodCalculation;
  readings: Reading[];
  meters: Meter[];
  apartments: Apartment[];
};

const findReading = (
  readings: Reading[],
  meterId: string,
): Reading | undefined => readings.find((item) => item.meter_id === meterId);

const findMeter = (
  meters: Meter[],
  apartmentId: string | null,
  mediaType: "electricity" | "water",
): Meter | undefined =>
  meters.find(
    (meter) =>
      meter.apartment_id === apartmentId &&
      meter.media_type === mediaType &&
      !meter.is_master,
  );

// nagłówek: licznik główny prądu, suma podliczników, wyliczona stawka
const buildHeader = (input: NoteInput): string[] => {
  const { calculation, readings, meters } = input;
  const lines: string[] = [SEPARATOR, ""];

  const masterMeter = meters.find(
    (meter) => meter.is_master && meter.media_type === "electricity",
  );
  const masterReading = masterMeter
    ? findReading(readings, masterMeter.id)
    : undefined;

  lines.push(
    `Główny_licznik_prąd_ostatnio: ${
      masterReading ? num(masterReading.previous_value, 3) : ""
    }`,
  );
  lines.push(
    `Główny_licznik_prąd_teraz: ${
      masterReading ? num(masterReading.current_value, 3) : ""
    }`,
  );

  const mainDifference =
    calculation.main_meter_error?.main_difference ??
    (masterReading
      ? masterReading.current_value - masterReading.previous_value
      : 0);
  lines.push(`Różnica_Liczników: ${num(mainDifference, 3)}`);

  // zużycia prądu z liczników mieszkaniowych (bez nadrzędnego)
  const apartmentConsumptions = calculation.consumptions.filter(
    (item) => item.media_type === "electricity" && !item.is_master,
  );
  const sumParts = apartmentConsumptions
    .map((item) => num(item.consumption))
    .join(" + ");
  const sumTotal = apartmentConsumptions.reduce(
    (total, item) => total + item.consumption,
    0,
  );
  lines.push(
    `Suma_liczników: ${sumParts}${sumParts ? " = " : ""}${num(sumTotal)}`,
  );

  const bill = calculation.period.electricity_bill_amount;
  if (bill !== null) {
    lines.push(
      `koszt: ${num(bill)} / ${num(sumTotal)} = ${num(
        calculation.electricity_rate,
      )}`,
    );
    lines.push(`Do zapłaty: ${num(bill)}`);
  } else {
    lines.push(`koszt (stawka): ${num(calculation.electricity_rate)}`);
  }

  // suma kosztów prądu rozdzielonych na mieszkania
  const costParts = calculation.settlements
    .map((entry) => Math.round(entry.settlement.electricity_cost))
    .filter((value) => value > 0);
  const costTotal = costParts.reduce((total, value) => total + value, 0);
  lines.push(
    `Suma: ${costParts.join(" + ")}${costParts.length ? " = " : ""}${costTotal}zł`,
  );

  lines.push("");
  lines.push(
    "Uwaga: Żeby policzyć koszt prądu najpierw odczytuje z tauronu i wtedy mam ile złoty do zapłaty i dziele przez sume kilowaty!",
  );
  lines.push("");

  return lines;
};

// blok per mieszkanie: odczyty, wyliczenia prądu i wody, pozostałe pozycje
const buildApartmentBlock = (
  input: NoteInput,
  entry: PeriodCalculation["settlements"][number],
): string[] => {
  const { calculation, readings, meters } = input;
  const lines: string[] = [SEPARATOR, ""];
  const settlement = entry.settlement;

  lines.push(`${entry.apartment_name}:`);
  lines.push("");

  const electricityMeter = findMeter(meters, entry.apartment_id, "electricity");
  const waterMeter = findMeter(meters, entry.apartment_id, "water");
  const electricityReading = electricityMeter
    ? findReading(readings, electricityMeter.id)
    : undefined;
  const waterReading = waterMeter
    ? findReading(readings, waterMeter.id)
    : undefined;

  if (electricityReading) {
    lines.push(`Ostatnio - ${num(electricityReading.previous_value, 3)} - prąd`);
  }
  if (waterReading) {
    lines.push(`Ostatnio - ${num(waterReading.previous_value, 3)} - woda`);
  }
  lines.push("");
  if (electricityReading) {
    lines.push(`Teraz - ${num(electricityReading.current_value, 3)} - prąd`);
  }
  if (waterReading) {
    lines.push(`Teraz - ${num(waterReading.current_value, 3)} - woda`);
  }
  lines.push("");

  const rate = calculation.electricity_rate;
  const waterRate = calculation.period.water_rate;

  if (electricityReading) {
    lines.push(
      `Prąd(${num(rate)} za 1kWh): ${num(
        electricityReading.current_value,
        3,
      )} - ${num(electricityReading.previous_value, 3)} = ${num(
        settlement.electricity_consumption,
      )} * ${num(rate)} = ${num(settlement.electricity_cost)} ~ ${zl(
        settlement.electricity_cost,
      )}`,
    );
  }
  if (waterReading) {
    lines.push(
      `Woda(${num(waterRate)} za kubik): ${num(
        waterReading.current_value,
        3,
      )} - ${num(waterReading.previous_value, 3)} = ${num(
        settlement.water_consumption,
        3,
      )} * ${num(waterRate)} = ${num(settlement.water_cost)} ~ ${zl(
        settlement.water_cost,
      )}`,
    );
  }

  // pozostałe pozycje rozliczenia (śmieci, internet, garaż, korekty)
  const otherItems = settlement.items.filter(
    (item) => !["rent", "electricity", "water"].includes(item.kind),
  );
  otherItems.forEach((item) => {
    lines.push(`${item.name}: ${zl(item.amount)}`);
  });

  lines.push("");

  const mediaParts: number[] = [];
  if (electricityReading) {
    mediaParts.push(Math.round(settlement.electricity_cost));
  }
  if (waterReading) {
    mediaParts.push(Math.round(settlement.water_cost));
  }
  otherItems.forEach((item) => mediaParts.push(Math.round(item.amount)));
  const mediaTotal = mediaParts.reduce((total, value) => total + value, 0);

  lines.push(`Razem: ${mediaParts.join(" + ")} = ${mediaTotal}zł`);

  if (settlement.rent_amount > 0) {
    lines.push(`Czynsz: ${zl(settlement.rent_amount)}`);
    lines.push(`Razem z czynszem: ${zl(settlement.total_amount)}`);
  }

  lines.push("");

  return lines;
};

// blok per beneficjent podziału rodzinnego
const buildBeneficiaryBlock = (
  beneficiary: PeriodCalculation["beneficiaries"][number],
): string[] => {
  const lines: string[] = [`${beneficiary.beneficiary_name}:`];

  beneficiary.items.forEach((item) => {
    lines.push(`${item.description}: ${num(item.amount)}`);
  });

  lines.push(`Razem: ${zl(beneficiary.total_amount)}`);
  lines.push("");

  return lines;
};

export const buildRentalNote = (input: NoteInput): string => {
  const lines: string[] = [];

  lines.push(...buildHeader(input));

  input.calculation.settlements.forEach((entry) => {
    lines.push(...buildApartmentBlock(input, entry));
  });

  if (input.calculation.beneficiaries.length > 0) {
    lines.push(SEPARATOR, "");
    input.calculation.beneficiaries.forEach((beneficiary) => {
      lines.push(...buildBeneficiaryBlock(beneficiary));
    });
  }

  if (input.calculation.warnings.length > 0) {
    lines.push(SEPARATOR, "", "Ostrzeżenia:");
    input.calculation.warnings.forEach((warning) => lines.push(`- ${warning}`));
    lines.push("");
  }

  return lines.join("\n");
};

export const downloadTextFile = (fileName: string, content: string): void => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
