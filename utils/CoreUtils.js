import { isNull, isUndefined, isString, trim } from "lodash";
import { ToastNotificationService } from "./ToastNotificationService";
import { showLoading, hideLoading } from "../components/Controls/WaitControl/loadingSlice";
import { store } from "../app/stores/store";

export class CoreUtils {
    static isWhiteSpace(str) {
        return !str || /^\s*$/.test(str);
    }

    static isNullOrEmpty(value) {
        if (!isString(value)) return true;
        if (isNull(value) || isUndefined(value)) return true;
        return trim(value).length === 0;
    }

    static isUndefined(obj) {
        return typeof obj === 'undefined';
    }

    static evaluateObject(obj) {
        return !!(obj && typeof obj === 'object' && Object.keys(obj).length > 0);
    }

    static isValidEntity(entity) {
        if (isNull(entity) || isUndefined(entity)) return false;
        if (Array.isArray(entity)) return entity.length > 0;
        if (typeof entity === 'object') return this.evaluateObject(entity);
        return false;
    }

    static hasErrorResponse(response) {
        const fieldErrors = [
            'exceptionMessage', 'erroresValidacion', 'validationErrorMessage',
            'mensajeValidacion', 'mensajeError', 'message', 'mensaje',
            'error', 'errorMessage', 'stackTrace', 'ErrorMessage',
        ];

        if (!this.isValidEntity(response)) return false;

        return fieldErrors.some(field => {
            const value = response[field];
            if (typeof value === 'object') return this.evaluateObject(value);
            if (typeof value === 'string' && value.trim() !== '') return true;
            return false;
        });
    }

    static notificationWarning(message) {
        ToastNotificationService.Warn(message);
    }

    static notificationSuccess(message) {
        ToastNotificationService.Success(message);
    }

    static notificationError(message) {
        ToastNotificationService.Error(message);
    }

    static notificationInfo(message) {
        ToastNotificationService.Info(message);
    }

    static waitControlShow(message = "Cargando...") {
        store.dispatch(showLoading(message));
    }

    static waitControlHide() {
        store.dispatch(hideLoading());
    }
}