'use client'

import React, { useState } from 'react';
import { GripVertical, Download, RefreshCw, Plus, Trash2, Upload } from 'lucide-react';

const WidgetOrganizer = () => {
  const [widgets, setWidgets] = useState([
    {
      "label": "corona",
      "weblink": "/tech",
      "_type": "list",
      "_sec_id": "19615041",
      "msid": "75432298",
      "_count": "9",
      "_m_count": "9",
      "_actuallabel": "टेक",
      "row": "0",
      "col": "4"
    },
    {
      "label": "government_schemes",
      "_type": "iframe",
      "weblink": "https://navbharattimes.indiatimes.com/in-focus/schemes/government?host=nbt",
      "row": "1"
    },
    {
      "label": "loksabha-elections",
      "_sec_id": "38417799",
      "_count": "10",
      "_m_count": "8",
      "_type": "list",
      "_rlvideoid": "4901881",
      "row": "2",
      "_actuallabel": "इजरायल-ईरान युद्ध"
    },
    {
      "label": "webstories",
      "weblink": "",
      "_sec_id": "75432298",
      "_type": "list",
      "_rlvideoid": "4901886",
      "_count": "10",
      "row": "3"
    },
    {
      "label": "Plus",
      "weblink": "",
      "_count": "11",
      "_type": "plusWidget",
      "override": "https://apnabazaar.indiatimes.com",
      "host": "apnabazaar",
      "row": "4"
    },
    {
      "label": "india",
      "weblink": "",
      "_sec_id": "1564454",
      "_count": "6",
      "_type": "list",
      "row": "10",
      "col": "4"
    },
    {
      "label": "cricket",
      "weblink": "",
      "_type": "list",
      "row": "19",
      "_sec_id": "3521869"
    },
    {
      "label": "movie",
      "_star": "false",
      "_sec_id": "2279793",
      "msid": "",
      "_listtype": "",
      "_count": "10",
      "_m_count": "10",
      "_type": "list",
      "override": "https://navbharattimes.indiatimes.com/world/uae/articlelist/38417799.cms",
      "row": "5",
      "weblink": ""
    },
    {
      "label": "city",
      "weblink": "/state/articlelist/.cms",
      "_type": "list",
      "_sec_id": "2279808",
      "_rlvideoid": "20104392",
      "_count": "5",
      "row": "6"
    },
    {
      "label": "business",
      "weblink": "",
      "_sec_id": "2279786",
      "_type": "list",
      "_rlvideoid": "11873677",
      "row": "13",
      "col": "8"
    },
    {
      "label": "personal_finance",
      "weblink": "",
      "_platform": "desktop",
      "_sec_id": "18558220",
      "_type": "list",
      "_count": "3",
      "_actuallabel": "पर्सनल फाइनेंस",
      "row": "13",
      "col": "4"
    },
    {
      "label": "apanabazaar",
      "weblink": "",
      "_type": "list",
      "_count": "20",
      "row": "18",
      "_actuallabel": "अपना बाजार",
      "_sec_id": "2147478187"
    },
    {
      "label": "metro",
      "weblink": "",
      "_type": "list",
      "_sec_id": "48899289",
      "row": "10",
      "col": "4",
      "_actuallabel": "गुड न्यूज"
    },
    {
      "label": "sports",
      "weblink": "",
      "_sec_id": "109034025",
      "_count": "7",
      "_type": "list",
      "_actuallabel": "अमेरिका ",
      "row": "7",
      "col": "4"
    },
    {
      "label": "world",
      "weblink": "",
      "_sec_id": "2279801",
      "_count": "7",
      "_type": "list",
      "row": "7",
      "col": "4"
    },
    {
      "label": "auto",
      "weblink": "",
      "_sec_id": "2354730",
      "_m_count": "4",
      "_type": "list",
      "_count": "8",
      "row": "8",
      "col": "4"
    },
    {
      "label": "tech",
      "weblink": "",
      "_sec_id": "33503484",
      "_count": "8",
      "_type": "list",
      "_rlvideoid": "",
      "row": "8",
      "col": "4",
      "_actuallabel": "मेट्रो"
    },
    {
      "label": "lifestyle",
      "weblink": "",
      "_sec_id": "2354729",
      "_count": "16",
      "_m_count": "5",
      "_type": "list",
      "_rlvideoid": "57791552",
      "row": "9"
    },
    {
      "label": "video",
      "weblink": "",
      "_actuallabel": "वीडियो",
      "_sec_id": "4901865",
      "_nav_id": "4901865",
      "_type": "video",
      "row": "17"
    },
    {
      "label": "astro",
      "weblink": "",
      "_sec_id": "17127056",
      "_type": "list",
      "_actuallabel": "राशिफल",
      "_rlvideoid": "48972527",
      "row": "11",
      "col": "8"
    },
    {
      "label": "education",
      "weblink": "",
      "_sec_id": "2279784",
      "_count": "6",
      "_type": "list",
      "_rlvideoid": "59541120",
      "row": "8",
      "col": "4"
    },
    {
      "label": "Poll",
      "weblink": "",
      "_sec_id": "696089404",
      "_count": "6",
      "_mcount": "4",
      "_type": "poll",
      "row": "10",
      "col": "4"
    },
    {
      "label": "factcheck",
      "weblink": "",
      "_sec_id": "93273647",
      "_type": "list",
      "_actuallabel": "क्राइम",
      "row": "14",
      "col": "4"
    },
    {
      "label": "photo",
      "weblink": "https://navbharattimes.indiatimes.com/photomazza/photoarticlelist/2339144.cms",
      "_sec_id": "2339144",
      "_type": "photo",
      "row": "12"
    },
    {
      "label": "Service Drawer",
      "weblink": "",
      "_type": "servicedrawer"
    },
    {
      "label": "travel",
      "weblink": "",
      "_sec_id": "17127056",
      "_count": "4",
      "_type": "list",
      "_actuallabel": "धर्म",
      "row": "11",
      "col": "4"
    },
    {
      "label": "jobs",
      "weblink": "",
      "_sec_id": "47479886",
      "_count": "4",
      "_type": "list",
      "_actuallabel": "जॉब्स",
      "row": "14",
      "col": "4"
    },
    {
      "label": "photoiframe",
      "weblink": "https://tamil.samayam.com/topgalleies_tamil_pwa.cms?channel=mt",
      "_sec_id": "2339144",
      "_count": "4",
      "_type": "photoiframe",
      "row": "16",
      "col": "8"
    },
    {
      "label": "jokes",
      "weblink": "",
      "_sec_id": "120721512",
      "_count": "4",
      "_type": "list",
      "_actuallabel": "WWE",
      "row": "16",
      "col": "4"
    },
    {
      "label": "viral",
      "weblink": "",
      "_sec_id": "82150262",
      "_count": "5",
      "_type": "list",
      "row": "15",
      "col": "4"
    },
    {
      "label": "vichar",
      "weblink": "",
      "_platform": "desktop",
      "_sec_id": "2007740431",
      "_count": "5",
      "_type": "list"
    },
    {
      "label": "nbtblogs",
      "weblink": "",
      "_platform": "desktop",
      "_sec_id": "22797821",
      "_count": "3",
      "_type": "list",
      "row": "15",
      "col": "4"
    },
    {
      "label": "readerblogs",
      "weblink": "",
      "_platform": "desktop",
      "_sec_id": "22797822",
      "_count": "2",
      "_type": "list"
    },
    {
      "label": "cr",
      "weblink": "",
      "_platform": "desktop",
      "_sec_id": "64679468",
      "_type": "list",
      "_actuallabel": "यात्रा",
      "row": "14",
      "col": "4"
    },
    {
      "label": "Weather",
      "weblink": "",
      "_type": "weather",
      "_platform": "desktop"
    },
    {
      "label": "plvideos",
      "weblink": "",
      "_rlvideoid": "11872954"
    },
    {
      "label": "goldfallback",
      "weblink": "",
      "_type": "list",
      "_actuallabel": "टीवी",
      "_count": "3",
      "_sec_id": "65685377"
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleWidgetClick = (widget) => {
    setSelectedWidget(widget);
    setIsModalOpen(true);
  };

  const handleWidgetUpdate = () => {
    const updatedWidgets = [...widgets];
    const idx = widgets.findIndex(w => w.label === selectedWidget.label && w._sec_id === selectedWidget._sec_id);
    if (idx !== -1) {
      updatedWidgets[idx] = selectedWidget;
      setWidgets(updatedWidgets);
    }
    setIsModalOpen(false);
  };

  const getWidgetTypeColor = (type) => {
    const colors = {
      'list': 'bg-blue-100 border-blue-300 text-blue-800',
      'video': 'bg-red-100 border-red-300 text-red-800',
      'photo': 'bg-green-100 border-green-300 text-green-800',
      'photoiframe': 'bg-green-100 border-green-300 text-green-800',
      'weather': 'bg-yellow-100 border-yellow-300 text-yellow-800',
      'poll': 'bg-pink-100 border-pink-300 text-pink-800',
      'servicedrawer': 'bg-gray-100 border-gray-300 text-gray-800',
      'iframe': 'bg-purple-100 border-purple-300 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e, dropIndex, targetRow) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const newWidgets = [...widgets];
    let draggedWidget = newWidgets[draggedItem];
    let dropWidget = newWidgets[dropIndex];
    let tempWidget = {...draggedWidget};

    draggedWidget.label = dropWidget.label;
    draggedWidget._actuallabel = dropWidget._actuallabel;
    draggedWidget.weblink = dropWidget.weblink;
    draggedWidget._type = dropWidget._type;
    draggedWidget._sec_id = dropWidget._sec_id;

    dropWidget.label = tempWidget.label;
    dropWidget._actuallabel = tempWidget._actuallabel;
    dropWidget.weblink = tempWidget.weblink;
    dropWidget._type = tempWidget._type;
    dropWidget._sec_id = tempWidget._sec_id;

    // Update row and col positions
    const updatedWidgets = newWidgets.map((widget, index) => {
      const updated = {
        ...widget,
        row: String(parseInt(widget.row))
      };
      // Only include col if it is a valid value
      if (widget.col !== undefined && widget.col !== null) {
        updated.col = String(parseInt(widget.col));
      } else {
        delete updated.col;
      }
      // Remove originalIndex if present
      if (updated.originalIndex !== undefined) {
        delete updated.originalIndex;
      }
      return updated;
    });
    
    updatedWidgets[draggedItem] = {
      ...updatedWidgets[draggedItem],
      row: targetRow
    };

    setWidgets(updatedWidgets);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const generateOutput = () => {
    const cleanedWidgets = widgets.map(widget => {
      const cleaned = { ...widget };
      if (cleaned.col === null || cleaned.col === undefined) {
        delete cleaned.col;
      }
      if (cleaned.originalIndex !== undefined) {
        delete cleaned.originalIndex;
      }
      return cleaned;
    });
    const outputJson = { widgets: cleanedWidgets };
    setOutput(JSON.stringify(outputJson, null, 2));
    setShowOutput(true);
  };

  const resetLayout = () => {
    // Reset to original order with updated positions
    const resetWidgets = widgets.map((widget, index) => ({
      ...widget,
      row: String(parseInt(widget.row)),
      col: widget.col ? String(parseInt(widget.col)) : null
    }));
    setWidgets(resetWidgets);
  };

  const downloadJson = () => {
    const outputJson = {
      widgets: widgets
    };
    const blob = new Blob([JSON.stringify(outputJson, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'widgets-layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUrlFetch = async () => {
    if (!urlInput) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(urlInput);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.widgets && Array.isArray(data.widgets)) {
        setWidgets(data.widgets);
      } else {
        throw new Error('Invalid data format. Expected an array of widgets.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch data from URL');
    } finally {
      setIsLoading(false);
    }
  };

  // Group widgets by row for display
  const groupedWidgets = widgets.reduce((acc, widget, index) => {
    let newrow = widget.row || "";
    if (widget.col) {
      newrow = newrow + ".1";
    } else {
      newrow = newrow + "." + index;
    }
    if (!acc[newrow]) acc[newrow] = [];
    acc[newrow].push({ ...widget });
    return acc;
  }, {});

  return (
    <div className="max-w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex justify-between items-center hover:bg-gray-100 transition-colors p-4 rounded-lg mb-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Widget Layout Organizer</h1>
          <svg
            className={`w-6 h-6 transform transition-transform duration-200 ${isAccordionOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="#aaa"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div 
          id="accordian"
          className={`grid transition-all duration-200 ease-in-out ${
            isAccordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div>
              {/* Header + Button Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={resetLayout}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
                  >
                    <RefreshCw size={18} />
                    Reset
                  </button>
                  <button
                    onClick={generateOutput}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                  >
                    <Plus size={18} />
                    Generate JSON
                  </button>
                  <button
                    onClick={downloadJson}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>

              {/* URL Uploader Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                <h2 className="text-lg font-semibold mb-3">Import Widgets from URL</h2>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Enter URL to fetch widget data"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUrlFetch}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    <Upload size={18} />
                    {isLoading ? 'Loading...' : 'Fetch'}
                  </button>
                </div>
                {error && (
                  <div className="mt-2 text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Widgets grid */}
        <div className="grid gap-4">
          {Object.keys(groupedWidgets).sort((a, b) => parseInt(a) - parseInt(b)).map((row) => (
            <div key={row} className="bg-gray-100 p-2 sm:p-2 rounded-lg">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">Row {parseInt(row)}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {groupedWidgets[row].map((widget,idx) => (
                  <div
                    key={idx+widget.label}
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, idx, row)}
                    className={`
                      relative p-2 sm:p-1 rounded-lg border-2 cursor-move transition-all duration-200
                      ${getWidgetTypeColor(widget._type)}
                      ${draggedItem === idx ? 'opacity-50 scale-95' : ''}
                      ${dragOverItem === idx ? 'ring-2 ring-blue-400 scale-105' : ''}
                      hover:shadow-md hover:scale-[1.02]
                    `}
                    onClick={() => handleWidgetClick(widget)}
                    title={`Idx: ${idx}\nLabel: ${widget.label}\nType: ${widget._type}\nCount: ${widget._count || '-'}\nRow: ${widget.row}\nCol: ${widget.col}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <GripVertical size={16} className="text-gray-400" />
                          <h4 className="font-semibold text-sm">
                            {widget._actuallabel || widget.label}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* JSON Output section */}
        {showOutput && (
          <div className="fixed inset-0 bg-zinc-800/90 z-50 flex justify-end">
            <div 
              id="outputBox" 
              className="w-full max-w-2xl h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
              style={{ transform: showOutput ? 'translateX(0)' : 'translateX(100%)' }}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Generated JSON Output</h3>
                  <button
                    onClick={() => setShowOutput(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    {output}
                  </pre>
                </div>
                <div className="p-4 border-t">
                  <button
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Widget type tags */}
        <div className="mt-6 text-sm text-gray-500">
          <h4 className="font-semibold mb-2">Widget Types:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">List</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded">Video</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Photo</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Photo Iframe</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Weather</span>
            <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded">Poll</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Iframe</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">Service Drawer</span>
          </div>
        </div>
      </div>
      {isModalOpen && selectedWidget && (
        <div className="fixed inset-0 bg-zinc-800/95 flex justify-center items-center z-50">
          <div className="bg-white text-gray-800 p-6 rounded shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Widget</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Label</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget.label}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, label: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Section ID</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget._sec_id || ''}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, _sec_id: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Count</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget._count || ''}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, _count: e.target.value })
                  }
                />
              </div>
              {selectedWidget.component && (
                <div>
                  <label className="block text-sm font-medium">Component Desktop</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={selectedWidget.component?.desktop || ''}
                    onChange={(e) =>
                      setSelectedWidget({ ...selectedWidget, component: {desktop: e.target.value, mobile: selectedWidget.component.mobile} })
                  }
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium">Row</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget.row || ''}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, row: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Column</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget.col || ''}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, col: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Actual Label</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={selectedWidget._actuallabel || ''}
                  onChange={(e) =>
                    setSelectedWidget({ ...selectedWidget, _actuallabel: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handleWidgetUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WidgetOrganizer;