import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from 'lucide-react';

function HomePage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Tabs */}
      <div className="flex bg-gray-200 p-2">
        <Button variant="ghost" className="mr-2">HOME</Button>
        <Button variant="ghost" className="mr-2">LIB</Button>
        <Button variant="ghost">VIS</Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4">
          {/* We'll implement search functionality later */}
          <div className="mb-4">
            <select className="w-full p-2 border rounded">
              <option>Instance</option>
              <option>Library</option>
              <option>Visualization</option>
            </select>
          </div>
          <input type="text" placeholder="Search..." className="w-full p-2 border rounded" />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Instances */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Instance</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Instance
              </Button>
            </div>
            <div className="flex space-x-4">
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Instance 1</CardContent>
              </Card>
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Instance 2</CardContent>
              </Card>
            </div>
          </div>

          {/* Libraries */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Library</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Library
              </Button>
            </div>
            <div className="flex space-x-4">
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Library 1</CardContent>
              </Card>
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Library 2</CardContent>
              </Card>
            </div>
          </div>

          {/* Visualizations */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Visualization</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Visualization
              </Button>
            </div>
            <div className="flex space-x-4">
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Visualization 1</CardContent>
              </Card>
              <Card className="w-40 h-24 flex items-center justify-center">
                <CardContent>Visualization 2</CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
