
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
import { ArrowUp, ArrowDown, Filter, Moon, Sun } from "lucide-react";
import { mockIncidents, Incident } from "@/data/mockIncidents";
import { NewIncidentForm } from "./NewIncidentForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTheme } from "@/hooks/useTheme";

export const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedIncidents, setExpandedIncidents] = useState<number[]>([]);
  const { theme, toggleTheme } = useTheme();

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
    const baseColors = {
      High: "bg-green-800 dark:bg-green-600 text-white",
      Medium: "bg-green-600 dark:bg-green-700 text-white",
      Low: "bg-green-500 dark:bg-green-700 text-white",
    };
    return baseColors[severity as keyof typeof baseColors] || "bg-green-400 dark:bg-green-600 text-white";
  };

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-sky-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-blue-500 dark:bg-blue-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-bold text-white">AI Safety Incident Dashboard</h1>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="bg-white/10 hover:bg-white/20"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Report New Incident
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <NewIncidentForm onSubmit={handleAddIncident} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 bg-sky-200 dark:bg-sky-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select
                value={selectedSeverity}
                onValueChange={setSelectedSeverity}
              >
                <SelectTrigger className="w-[180px] bg-white/50 dark:bg-black/50">
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
              className="bg-white/50 dark:bg-black/50 hover:bg-white/70 dark:hover:bg-black/70"
            >
              {sortOrder === "asc" ? (
                <ArrowUp className="h-4 w-4 mr-2" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-2" />
              )}
              {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredIncidents.map((incident) => (
              <Card 
                key={incident.id} 
                className="p-6 bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 transition-all duration-300 soft-shadow"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-lg">{incident.title}</h3>
                      <div className="flex gap-2 items-center">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className="text-sm opacity-80">
                          {new Date(incident.reported_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => toggleExpanded(incident.id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white"
                    >
                      {expandedIncidents.includes(incident.id)
                        ? "Hide Details"
                        : "View Details"}
                    </Button>
                  </div>
                  {expandedIncidents.includes(incident.id) && (
                    <p className="mt-2 p-3 rounded-md bg-green-200 dark:bg-green-700">
                      {incident.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
