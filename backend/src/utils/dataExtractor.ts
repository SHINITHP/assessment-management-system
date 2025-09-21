import jp from 'jsonpath';
import _ from 'lodash';

export function extractValue(data: any, path: string): any {
  const simpleValue = _.get(data, path, null);
  if (simpleValue !== null) {
    return Array.isArray(simpleValue) ? simpleValue.join(', ') : simpleValue;
  }
  // Fallback to JSONPath for complex queries
  if (!path) {
    console.log("No valid path provided, returning N/A");
    return 'N/A';
  }
  const values = jp.query(data, path);
  return values.length > 0 ? (Array.isArray(values[0]) ? values[0].join(', ') : values[0]) : 'N/A';
}

export function classifyValue(value: string | number, classifications: any[]): { label: string; color: string } {
  const numValue = parseFloat(value as string);
  if (isNaN(numValue)) return { label: '', color: '' };
  for (const cls of classifications) {
    if (numValue >= cls.min && numValue <= cls.max) {
      return { label: cls.label, color: cls.color };
    }
  }
  return { label: '', color: '' };
}