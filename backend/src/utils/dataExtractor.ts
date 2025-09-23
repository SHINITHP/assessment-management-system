import jp from "jsonpath";
import _ from "lodash";

export function extractValue(data: any, path: string): any {
  const simpleValue = _.get(data, path, null);
  if (simpleValue !== null) {
    return Array.isArray(simpleValue) ? simpleValue.join(", ") : simpleValue;
  }
  if (!path) {
    console.log("No valid path provided, returning N/A");
    return "N/A";
  }
  const values = jp.query(data, path);
  return values.length > 0
    ? Array.isArray(values[0])
      ? values[0].join(", ")
      : values[0]
    : "N/A";
}

export function extractArrayValue(data: any, path: string): string[] {
  if (!path) return ['N/A'];

  let value = _.get(data, path);
  
  if (value === undefined) {
    const values = jp.query(data, path);
    value = values[0]?.analysisList ?? values[0];
  }

  // Convert to array of strings
  if (Array.isArray(value)) {
    return value.map(item => String(item ?? 'N/A'));
  } else if (value !== undefined && value !== null) {
    return [String(value)];
  }

  return ['N/A'];
}

interface IClassification {
  label: string;
  color: string;
  min?: number;
  max?: number;
}

export const classifyValue = (
  value: string | number,
  classifications: IClassification[]
): IClassification => {
  const numValue = parseFloat(value as string);
  if (isNaN(numValue)) return { min: 0, max: 0, label: "", color: "" };

  for (const cls of classifications) {
    if (cls.min !== undefined && cls.max !== undefined) {
      if (numValue >= cls.min && numValue <= cls.max) {
        return cls;
      }
    }
  }
  return { min: 0, max: 0, label: "", color: "" };
};
