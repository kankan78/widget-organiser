'use client'

import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, Edit3, Trash2, Plus, Download, Upload, Save, X, Eye, Edit2, Minus } from 'lucide-react';

const RowNameEditor = ({ row, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(row.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() && editValue !== row.name) {
      onRename(row.id, editValue.trim());
    } else {
      setEditValue(row.name);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(row.name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className="text-sm font-medium text-gray-700 bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <h3 className="text-sm font-medium text-gray-700">{row.name}</h3>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-600 rounded transition-opacity"
        title="Rename Row"
      >
        <Edit2 className="w-3 h-3" />
      </button>
    </div>
  );
};

const WidgetLayoutOrganizer = () => {
  const [layoutName, setLayoutName] = useState('Homepage - Default');
  const [fetchUrl, setFetchUrl] = useState('');
  const [widgets, setWidgets] = useState([
    {
      "label": "webstories",
      "weblink": "",
      "_type": "list",
      "_sec_id": "85765840",
      "_count": "9",
      "_m_count": "9",
      "row": "3"
    },
    {
      "label": "movie",
      "_type": "list",
      "weblink": "",
      "row": "1",
      "_sec_id": "10738512"
    },
    {
      "label": "business",
      "weblink": "",
      "_sec_id": "10738503",
      "_type": "list",
      "_rlvideoid": "50075709",
      "row": "6"
    },
    {
      "label": "loksabha-elections",
      "_star": "false",
      "_sec_id": "180203010200",
      "msid": "",
      "_listtype": "taxonomy",
      "_count": "10",
      "_m_count": "10",
      "_type": "list",
      "override": "https://vijaykarnataka.com/bengaluru/about-bengaluru-citizens-services",
      "_actuallabel": "Bangalore Civil Services",
      "row": "2"
    },
    {
      "label": "tech",
      "weblink": "",
      "_type": "list",
      "_sec_id": "60023487",
      "_count": "7",
      "row": "10",
      "col": "4"
    },
    {
      "label": "astro",
      "weblink": "",
      "_sec_id": "10738518",
      "_count": "4",
      "_type": "list",
      "_rlvideoid": "66705082",
      "row": "12",
      "col": "8"
    },
    {
      "label": "city",
      "weblink": "",
      "_sec_id": "71478549",
      "_count": "10",
      "_type": "list",
      "_rlvideoid": "50075603",
      "row": "5"
    },
    {
      "label": "lifestyle",
      "weblink": "",
      "_sec_id": "57869229",
      "_count": "17",
      "_type": "list",
      "_rlvideoid": "60309735",
      "row": "9"
    },
    {
      "label": "government_schemes",
      "weblink": "https://vijaykarnataka.com/in-focus/schemes/government?host=vk",
      "_count": "11",
      "_type": "iframe",
      "_rlvideoid": "50075616",
      "row": "0",
      "col": "4"
    },
    {
      "label": "auto",
      "weblink": "",
      "_sec_id": "70757673",
      "_type": "list",
      "_rlvideoid": "60309764",
      "row": "10",
      "col": "4",
      "_count": "7",
      "_actuallabel": "Automobile"
    },
    {
      "label": "travel",
      "weblink": "",
      "_sec_id": "70891136",
      "_count": "6",
      "_type": "list",
      "_rlvideoid": "70891491",
      "row": "4"
    },
    {
      "label": "photo",
      "weblink": "",
      "_type": "photo",
      "_sec_id": "47911469",
      "row": "7"
    },
    {
      "label": "corona",
      "weblink": "",
      "_sec_id": "10738520",
      "_count": "6",
      "_type": "list",
      "_actuallabel": "Sports News",
      "_rlvideoid": "71395281",
      "row": "10",
      "col": "4"
    },
    {
      "label": "education",
      "weblink": "",
      "_sec_id": "67881877",
      "_count": "4",
      "_type": "list",
      "_rlvideoid": "74062505",
      "row": "8",
      "col": "4"
    },
    {
      "label": "crime",
      "weblink": "",
      "_sec_id": "10765232",
      "_count": "5",
      "_type": "list",
      "row": "12",
      "col": "4"
    },
    {
      "label": "Weather",
      "weblink": "",
      "_type": "weather",
      "row": "20"
    },
    {
      "label": "Poll",
      "weblink": "",
      "_type": "poll",
      "_sec_id": "11181707",
      "row": "13",
      "col": "4"
    },
    {
      "label": "Service Drawer",
      "weblink": "",
      "_type": "servicedrawer"
    },
    {
      "label": "jobs",
      "weblink": "",
      "_sec_id": "67883630",
      "_type": "list",
      "row": "8",
      "col": "4"
    },
    {
      "label": "religion",
      "weblink": "",
      "_sec_id": "70757501",
      "_type": "list",
      "_rlvideoid": "72254514",
      "row": "8",
      "col": "4"
    },
    {
      "label": "viral",
      "weblink": "",
      "_sec_id": "71395137",
      "_count": "7",
      "_type": "list",
      "_actuallabel": "Viral Cross",
      "row": "11",
      "col": "4"
    },
    {
      "label": "photoiframe",
      "weblink": "https://tamil.samayam.com/topgalleies_tamil_pwa.cms?channel=mt",
      "_sec_id": "2339144",
      "_count": "4",
      "_type": "photoiframe",
      "row": "11",
      "col": "8"
    },
    {
      "label": "video",
      "weblink": "",
      "_sec_id": "49909262",
      "_nav_id": "49909262",
      "_type": "video",
      "row": "14"
    }
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverRow, setDragOverRow] = useState(null);
  const [editingWidget, setEditingWidget] = useState(null);
  const [showJsonViewer, setShowJsonViewer] = useState(false);
  const [newWidgetForm, setNewWidgetForm] = useState(false);
  const [rows, setRows] = useState([
    { id: '1', name: 'Row 1' },
    { id: '2', name: 'Row 2' },
    { id: '3', name: 'Row 3' },
    { id: '4', name: 'Row 4' },
    { id: '5', name: 'Row 5' },
    { id: '6', name: 'Row 6' },
    { id: '7', name: 'Row 7' },
    { id: '8', name: 'Row 8' },
    { id: '9', name: 'Row 9' },
    { id: '10', name: 'Row 10' },
    { id: '11', name: 'Row 11' },
    { id: '12', name: 'Row 12' },
  ]);

  const dragStartRef = useRef(null);

  const widgetTypes = [
    { value: 'list', label: 'List', color: 'bg-blue-100 border-blue-300' },
    { value: 'grid', label: 'Grid', color: 'bg-green-100 border-green-300' },
    { value: 'slider', label: 'Slider', color: 'bg-purple-100 border-purple-300' },
    { value: 'featured', label: 'Featured News', color: 'bg-orange-100 border-orange-300' }
  ];

  const getWidgetsByRow = (rowId) => {
    return widgets.filter(widget => widget.row === rowId);
  };

  const getWidgetTypeStyle = (type) => {
    const typeConfig = widgetTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'bg-gray-100 border-gray-300';
  };

  const handleDragStart = (e, widget) => {
    setDraggedItem(widget);
    dragStartRef.current = { widget, sourceRow: widget.rowId };
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, rowId) => {
    e.preventDefault();
    setDragOverRow(rowId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverRow(null);
    }
  };

  const handleDrop = (e, targetRowId) => {
    e.preventDefault();
    setDragOverRow(null);

    if (draggedItem && draggedItem.rowId !== targetRowId) {
      setWidgets(prev => prev.map(widget => 
        widget.id === draggedItem.id 
          ? { ...widget, rowId: targetRowId }
          : widget
      ));
    }
    setDraggedItem(null);
  };

  const handleWidgetReorder = (e, targetWidget) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetWidget.id) return;

    const sourceRow = draggedItem.rowId;
    const targetRow = targetWidget.rowId;

    if (sourceRow === targetRow) {
      // Reorder within the same row
      setWidgets(prev => {
        const rowWidgets = prev.filter(w => w.rowId === sourceRow);
        const otherWidgets = prev.filter(w => w.rowId !== sourceRow);
        
        const draggedIndex = rowWidgets.findIndex(w => w.id === draggedItem.id);
        const targetIndex = rowWidgets.findIndex(w => w.id === targetWidget.id);
        
        const newRowWidgets = [...rowWidgets];
        const [removed] = newRowWidgets.splice(draggedIndex, 1);
        newRowWidgets.splice(targetIndex, 0, removed);
        
        return [...otherWidgets, ...newRowWidgets];
      });
    }
  };

  const deleteWidget = (widgetId) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  const editWidget = (widget) => {
    setEditingWidget({ ...widget });
  };

  const saveWidget = () => {
    setWidgets(prev => prev.map(widget => 
      widget.id === editingWidget.id ? editingWidget : widget
    ));
    setEditingWidget(null);
  };

  const addNewWidget = () => {
    // Find the first available row, or use the first row if none exist
    const targetRowId = rows.length > 0 ? rows[0].id : 'row1';
    
    const newWidget = {
      id: Date.now().toString(),
      type: 'list',
      label: 'New Widget',
      config: {
        "label": "new_widget",
        "weblink": "",
        "_sec_id": Date.now().toString(),
        "_count": "5",
        "_type": "list",
        "_rlvideoid": Date.now().toString()
      },
      description: 'New widget description',
      rowId: targetRowId
    };
    setWidgets(prev => [...prev, newWidget]);
    setNewWidgetForm(false);
  };

  const exportLayout = () => {
    const layout = {
      name: layoutName,
      rows: rows,
      widgets: widgets,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${layoutName.replace(/\s+/g, '_')}_layout.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importLayout = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const layout = JSON.parse(event.target.result);
          setLayoutName(layout.name || 'Imported Layout');
          setWidgets(layout.widgets || []);
          if (layout.rows) {
            setRows(layout.rows);
          }
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const fetchLayoutFromUrl = async () => {
    if (!fetchUrl) return;
    
    try {
      const response = await fetch(fetchUrl);
      const layout = await response.json();
      setLayoutName(layout.name || 'Fetched Layout');
      setWidgets(layout.widgets || []);
      if (layout.rows) {
        setRows(layout.rows);
      }
    } catch (error) {
      alert('Failed to fetch layout from URL');
    }
  };

  const addNewRow = () => {
    const newRowNumber = rows.length + 1;
    const newRow = {
      id: `row${newRowNumber}`,
      name: `Row ${newRowNumber}`
    };
    setRows(prev => [...prev, newRow]);
  };

  const deleteRow = (rowId) => {
    const rowWidgets = getWidgetsByRow(rowId);
    
    if (rowWidgets.length > 0) {
      const confirmDelete = window.confirm(
        `This row contains ${rowWidgets.length} widget(s). Deleting the row will also delete all widgets in it. Are you sure?`
      );
      if (!confirmDelete) return;
    }
    
    // Remove the row
    setRows(prev => prev.filter(row => row.id !== rowId));
    
    // Remove all widgets in that row
    setWidgets(prev => prev.filter(widget => widget.rowId !== rowId));
  };

  const renameRow = (rowId, newName) => {
    setRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, name: newName } : row
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Widget Layout Organizer</h1>
          <p className="text-gray-600 mb-4">Drag and drop sections to reorder the layout of your news homepage. Fetch existing configurations via URL.</p>
          
          <div className="flex flex-wrap gap-4 items-end ">
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout Name</label>
              <input
                type="text"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex-1 min-w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fetch Layout from URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter JSON URL"
                  value={fetchUrl}
                  onChange={(e) => setFetchUrl(e.target.value)}
                  className="text-gray-500 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={fetchLayoutFromUrl}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Layout Rows</h2>
            <button
              onClick={addNewRow}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>
          </div>

          {rows.map((row) => {
            const rowWidgets = getWidgetsByRow(row.id);
            return (
              <div key={row.id} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <RowNameEditor 
                    row={row} 
                    onRename={renameRow}
                  />
                  <div className="text-xs text-gray-500">({rowWidgets.length} widget{rowWidgets.length !== 1 ? 's' : ''})</div>
                  {rows.length > 1 && (
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="gap-2 px-4 py-2 bg-red-200 text-white ml-auto p-1 text-gray-500 hover:text-red-600 rounded transition-colors cursor-pointer"
                      title="Delete Row"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div
                  className={`min-h-10 border-2 border-dashed rounded-lg p-1 transition-colors ${
                    dragOverRow === row.id 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  onDragOver={(e) => handleDragOver(e, row.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                  {rowWidgets.length === 0 ? (
                    <div className="text-center text-gray-400 py-6">
                      Drop widgets here
                    </div>
                  ) : (
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${rowWidgets.length} gap-4`}>
                      {rowWidgets.map((widget,idx) => (
                        <div
                          key={idx+widget.label}
                          draggable
                          onDragStart={(e) => handleDragStart(e, widget)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleWidgetReorder(e, widget)}
                          className={`p-1 rounded-lg border-2 cursor-move transition-all hover:shadow-md ${getWidgetTypeStyle(widget.type)} ${
                            draggedItem?.id === widget.id ? 'opacity-50 scale-95' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <GripVertical className="w-4 h-4 text-gray-400" />
                              <h4 className="font-medium text-gray-900">{widget.label}</h4>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => editWidget(widget)}
                                className="p-1 text-gray-500 hover:text-blue-600 rounded"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteWidget(widget.id)}
                                className="p-1 text-gray-500 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                                                    
                          {/* <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {widget.config._type}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                              ID: {widget.config._sec_id}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                              Count: {widget.config._count}
                            </span>
                          </div> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Widget Types Legend & Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Widget Types</h3>
          <div className="flex flex-wrap gap-4 mb-6 text-gray-500">
            {widgetTypes.map((type) => (
              <div key={type.value} className={`px-3 py-2 rounded-lg border-2 ${type.color}`}>
                <span className="text-sm font-medium">{type.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setNewWidgetForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Widget
            </button>
            
            <button
              onClick={() => setShowJsonViewer(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              View JSON
            </button>
            
            <button
              onClick={exportLayout}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Layout
            </button>
            
            <label className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              Import Layout
              <input type="file" accept=".json" onChange={importLayout} className="hidden" />
            </label>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
              <Save className="w-4 h-4" />
              Save Layout
            </button>
          </div>
        </div>

        {/* Edit Widget Modal */}
        {editingWidget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="text-gray-500 bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Edit Widget</h3>
                <button
                  onClick={() => setEditingWidget(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={editingWidget.label}
                    onChange={(e) => setEditingWidget(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Widget Type</label>
                  <select
                    value={editingWidget.type}
                    onChange={(e) => setEditingWidget(prev => ({ 
                      ...prev, 
                      type: e.target.value,
                      config: { ...prev.config, _type: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {widgetTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section ID</label>
                    <input
                      type="text"
                      value={editingWidget.config?._sec_id}
                      onChange={(e) => setEditingWidget(prev => ({ 
                        ...prev, 
                        config: { ...prev.config, _sec_id: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                    <input
                      type="text"
                      value={editingWidget.config?._count}
                      onChange={(e) => setEditingWidget(prev => ({ 
                        ...prev, 
                        config: { ...prev.config, _count: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Config Label</label>
                  <input
                    type="text"
                    value={editingWidget.config?.label}
                    onChange={(e) => setEditingWidget(prev => ({ 
                      ...prev, 
                      config: { ...prev.config, label: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weblink</label>
                  <input
                    type="text"
                    value={editingWidget.config?.weblink}
                    onChange={(e) => setEditingWidget(prev => ({ 
                      ...prev, 
                      config: { ...prev.config, weblink: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveWidget}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingWidget(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JSON Viewer Modal */}
        {showJsonViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-96 overflow-y-auto text-gray-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Layout JSON Configuration</h3>
                <button
                  onClick={() => setShowJsonViewer(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                {JSON.stringify({ name: layoutName, rows, widgets }, null, 2)}
              </pre>
              
              <button
                onClick={() => setShowJsonViewer(false)}
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Widget Modal */}
        {newWidgetForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Add New Widget</h3>
                <button
                  onClick={() => setNewWidgetForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">A new widget will be added to the first available row. You can edit it and move it to any row after creation.</p>
              
              <div className="flex gap-4">
                <button
                  onClick={addNewWidget}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Widget
                </button>
                <button
                  onClick={() => setNewWidgetForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetLayoutOrganizer;