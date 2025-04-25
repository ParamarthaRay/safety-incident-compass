
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown, Filter } from "lucide-react";
import { mockIncidents, Incident } from "@/data/mockIncidents";
import { NewIncidentForm } from "./NewIncidentForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedIncidents, setExpandedIncidents] = useState<number[]>([]);

  const filteredIncidents = incidents
    .filter((incident) =>
      selectedSeverity === "All" ? true : incident.severity === selectedSeverity
    )
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  const handleAddIncident = (newIncident: Omit<Incident, "id">) => {
    const id = Math.max(...incidents.map((i) => i.id)) + 1;
    setIncidents([...incidents, { ...newIncident, id }]);
  };

  const toggleExpanded = (id: number) => {
    setExpandedIncidents((prev) =>
      prev.includes(id)
        ? prev.filter((expandedId) => expandedId !== id)
        : [...prev, id]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">AI Safety Incident Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Report New Incident</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <NewIncidentForm onSubmit={handleAddIncident} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2"
          >
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{incident.title}</h3>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(incident.reported_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => toggleExpanded(incident.id)}
                  >
                    {expandedIncidents.includes(incident.id)
                      ? "Hide Details"
                      : "View Details"}
                  </Button>
                </div>
                {expandedIncidents.includes(incident.id) && (
                  <p className="text-gray-600 mt-2">{incident.description}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
