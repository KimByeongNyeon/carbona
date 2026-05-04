import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type {
  DashboardCategoryItem,
  DashboardResponse,
} from "../../dashboard/types";
import {
  formatChangeRate,
  formatEmissionNumber,
} from "../../dashboard/utils/dashboard.utils";

type ReportPdfDocumentProps = {
  dashboard: DashboardResponse;
};

const pdfCategoryLabels: Record<DashboardCategoryItem["category"], string> = {
  ELECTRICITY: "Electricity",
  MATERIAL: "Material",
  TRANSPORT: "Transport",
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 10,
    color: "#0f172a",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 22,
    marginBottom: 6,
    fontWeight: 700,
  },
  subtitle: {
    color: "#64748b",
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: 700,
  },
  grid: {
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flex: 1,
    border: "1px solid #e2e8f0",
    borderRadius: 6,
    padding: 10,
  },
  label: {
    color: "#64748b",
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: "#2563eb",
    fontWeight: 700,
  },
  table: {
    border: "1px solid #e2e8f0",
    borderRadius: 6,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1px solid #f1f5f9",
  },
  cell: {
    flex: 1,
    padding: 8,
  },
  rightCell: {
    flex: 1,
    padding: 8,
    textAlign: "right",
  },
});

const formatRateText = (value: number | null) => {
  if (value === null) {
    return "No previous month";
  }

  const sign = value > 0 ? "+" : value < 0 ? "-" : "";

  return `${sign}${formatChangeRate(value)}%`;
};

export const ReportPdfDocument = ({ dashboard }: ReportPdfDocumentProps) => {
  const { month, year } = dashboard.selectedPeriod;

  return (
    <Document
      title={`Carbon Report ${year}.${String(month).padStart(2, "0")}`}
      author="Carbona"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Carbon Emission Report</Text>
        <Text style={styles.subtitle}>
          Reporting month: {year}.{String(month).padStart(2, "0")} / Period:{" "}
          {dashboard.period} months
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.grid}>
            <View style={styles.card}>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.value}>
                {formatEmissionNumber(dashboard.summary.totalEmission)}
              </Text>
              <Text>kgCO2e</Text>
              <Text>
                MoM: {formatRateText(dashboard.summary.totalEmissionChangeRate)}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Electricity</Text>
              <Text style={styles.value}>
                {formatEmissionNumber(dashboard.summary.electricityEmission)}
              </Text>
              <Text>kgCO2e</Text>
              <Text>
                MoM:{" "}
                {formatRateText(
                  dashboard.summary.electricityEmissionChangeRate,
                )}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Material</Text>
              <Text style={styles.value}>
                {formatEmissionNumber(dashboard.summary.materialEmission)}
              </Text>
              <Text>kgCO2e</Text>
              <Text>
                MoM:{" "}
                {formatRateText(dashboard.summary.materialEmissionChangeRate)}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Transport</Text>
              <Text style={styles.value}>
                {formatEmissionNumber(dashboard.summary.transportEmission)}
              </Text>
              <Text>kgCO2e</Text>
              <Text>
                MoM:{" "}
                {formatRateText(dashboard.summary.transportEmissionChangeRate)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Summary</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>Category</Text>
              <Text style={styles.rightCell}>Emission</Text>
            </View>
            {dashboard.categorySummary.map((item) => (
              <View key={item.category} style={styles.row}>
                <Text style={styles.cell}>{pdfCategoryLabels[item.category]}</Text>
                <Text style={styles.rightCell}>
                  {formatEmissionNumber(item.emissionValue)} kgCO2e
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Trend</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>Month</Text>
              <Text style={styles.rightCell}>Emission</Text>
            </View>
            {dashboard.monthlyTrend.map((item) => (
              <View key={item.month} style={styles.row}>
                <Text style={styles.cell}>{item.month}</Text>
                <Text style={styles.rightCell}>
                  {formatEmissionNumber(item.emissionValue)} kgCO2e
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>Date</Text>
              <Text style={styles.cell}>Item</Text>
              <Text style={styles.rightCell}>Emission</Text>
            </View>
            {dashboard.recentActivities.map((activity) => (
              <View key={activity.id} style={styles.row}>
                <Text style={styles.cell}>
                  {new Date(activity.activityDate).toISOString().slice(0, 10)}
                </Text>
                <Text style={styles.cell}>{activity.itemName}</Text>
                <Text style={styles.rightCell}>
                  {formatEmissionNumber(activity.emissionValue)} kgCO2e
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Progress</Text>
          <Text>
            Target: {formatEmissionNumber(dashboard.target.totalTarget)} kgCO2e
          </Text>
          <Text>Progress: {dashboard.target.progress.toFixed(1)}%</Text>
        </View>
      </Page>
    </Document>
  );
};
