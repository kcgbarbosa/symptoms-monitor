import { useState } from 'react';
import { useEntriesStore } from '../../../store/useEntriesStore'
import { getSeverityLevel, SEVERITY_COLORS } from '../../utils/severityConstants';
import IconGrid from '../IconPicker/IconGrid';

const MODAL_ID = 'add_entry_modal';
const MODAL_CONTENT_ID = 'modal_content';
const MAX_NOTES_LENGTH = 500;
const MAX_NAME_LENGTH = 40;

function AddEntryModal() {
  const { addEntry, updateEntry, fetchEntries, resetForm, formData, setFormData, loading, entries } = useEntriesStore();

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const closeModal = () => {
    const modalContent = document.getElementById(MODAL_CONTENT_ID);
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
    resetForm();
    setFilteredSuggestions([]);
    document.getElementById(MODAL_ID).close();
  };

  const getLastIconForSymptom = (name) => {
    const key = (name || '').trim().toLowerCase();
    if (!key) return null;

    const match = [...entries]
      .reverse()
      .find((entry) => {
        const entryKey = (entry.symptom_name || '').trim().toLowerCase();
        return entryKey === key;
      });

    return match?.icon_name || null;
  };

  const entryNames = [...new Set(entries.map((e) => e.symptom_name))];

  const handleNameChange = (value) => {
    const name = value.slice(0, MAX_NAME_LENGTH);
    const normalizedInput = name.trim().toLowerCase();
    const lastIcon = getLastIconForSymptom(name);

    setFormData({
      ...formData,
      symptom_name: name,
      ...(lastIcon ? { icon_name: lastIcon } : {})
    });

    if (!normalizedInput) {
      setFilteredSuggestions([]);
    } else {
      setFilteredSuggestions(
        entryNames.filter(n =>
          n.toLowerCase().includes(normalizedInput)
        )
      );
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const lastIcon = getLastIconForSymptom(suggestion);
    setFormData({
      ...formData,
      symptom_name: suggestion,
      ...(lastIcon ? { icon_name: lastIcon } : {})
    });
    setFilteredSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.id) {
      await updateEntry(formData.id);
      await fetchEntries();
    } else {
      await addEntry(e);
    }
    closeModal();
  };

  return (
    <dialog id={MODAL_ID} className="modal modal-middle">
      <div
        id={MODAL_CONTENT_ID}
        className="modal-box w-11/12 max-w-lg relative bg-base-200 rounded-lg p-8 shadow-lg overflow-y-auto max-h-[90vh] no-scrollbar"
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >✕</button>

        <h3 className="font-bold text-xl mb-2">{formData?.id ? "Edit Entry" : "Add New Entry"}</h3>
        <p className="label-text text-small font-medium opacity-70 mb-6">
          {formData?.id ? "Update your entry details" : "Start typing to see your previous symptoms"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-base font-medium">Symptom Name</span>
              <span className="label-text-alt text-sm text-gray-500">{(formData.symptom_name || "").length}/{MAX_NAME_LENGTH}</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Fatigue, Joint Pain..."
              className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
              value={formData.symptom_name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={() => {
                const trimmedName = formData.symptom_name.trim();
                if (trimmedName !== formData.symptom_name) {
                  setFormData({
                    ...formData,
                    symptom_name: trimmedName
                  });
                }
              }}
            />

            {filteredSuggestions.length > 0 && (
              <ul className="absolute z-[100] top-[100%] left-0 w-full bg-base-100 border border-base-300 rounded-md shadow-xl max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-primary hover:text-primary-content transition-colors"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Select Icon</span>
            </label>
            <div className="bg-base-100 p-2 rounded-xl border border-base-300 shadow-inner">
              <IconGrid
                selectedIcon={formData.icon_name}
                onSelectIcon={(iconName) => setFormData({ ...formData, icon_name: iconName })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Severity</span>
              <span className={`font-bold text-xl ${SEVERITY_COLORS[getSeverityLevel(formData.severity)].text}`}>
                {formData.severity || 5}
              </span>
            </label>
            <div className="w-full mx-auto">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.severity || 5}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className={`range ${SEVERITY_COLORS[getSeverityLevel(formData.severity)].range}`}
                step="1"
              />
              <div className="flex justify-between px-2 mt-2">
                <span className="text-sm font-bold text-success uppercase text-[12px]">Mild</span>
                <span className="text-gray-300">—</span>
                <span className="text-sm font-bold text-warning uppercase text-[12px]">Moderate</span>
                <span className="text-gray-300">—</span>
                <span className="text-sm font-bold text-error uppercase text-[12px]">Severe</span>
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Date of Symptom</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full py-3 focus:input-primary transition-colors duration-200"
              value={formData.date_of_symptom}
              onChange={(e) => setFormData({ ...formData, date_of_symptom: e.target.value })}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium">Notes</span>
              <span className="label-text-alt text-sm text-gray-500">
                {(formData.notes || "").length}/{MAX_NOTES_LENGTH}
              </span>
            </label>
            <textarea
              placeholder="How are you feeling otherwise? (Optional)"
              className="textarea textarea-bordered w-full py-3 focus:textarea-primary transition-colors duration-200 resize-none h-24 shadow-inner"
              value={formData.notes}
              maxLength={MAX_NOTES_LENGTH}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px] text-white"
              disabled={!formData.symptom_name || !formData.severity || !formData.date_of_symptom || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                formData?.id ? "Save Changes" : "Save Entry"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddEntryModal;