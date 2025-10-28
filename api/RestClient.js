import { CoreUtils } from "../utils/CoreUtils";

const urlBase = "https://localhost:7217/api/";

const getRequestUserInfo = () =>
    sessionStorage.requestUserInfo
        ? JSON.parse(sessionStorage.requestUserInfo)
        : null;

const buildHeaders = (contentType = "application/json") => ({
    "Content-Type": contentType,
    Accept: "application/json",
    Authorization: `Bearer ${sessionStorage.access_token}`,
});

const handleResponse = async (response, useWaitControl, isEvaluateMessage) => {
    try {
        if (!response || response.status === 404 || response.stack || response.TypeError) {
            return response;
        }

        const data = await response.json();

        if (isEvaluateMessage) showValidationMessage(data);

        return data;
    } catch (error) {
        CoreUtils.notificationError(error.message);
        return null;
    } finally {
        if (useWaitControl) CoreUtils.waitControlHide(); // ← esto garantiza que el spinner se oculte
    }
};

const showValidationMessage = (response) => {
    if (!response) return;

    if (response.status === 500) {
        CoreUtils.notificationError(JSON.stringify(response));
    }
    if (!CoreUtils.isNullOrEmpty(response.message)) {
        CoreUtils.notificationWarning(response.message);
    }
    if (!CoreUtils.isNullOrEmpty(response.ValidationErrorMessage)) {
        CoreUtils.notificationWarning(response.ValidationErrorMessage);
    }
    if (!CoreUtils.isNullOrEmpty(response.SuccessMessage)) {
        CoreUtils.notificationSuccess(response.SuccessMessage);
    }
};

export class RestClient {
    static async get(url, params = {}, useWaitControl = true, isEvaluateMessage = true) {
        if (useWaitControl) CoreUtils.waitControlShow();

        const request = { ...params, RequestUserInfo: getRequestUserInfo() };
        const query = new URLSearchParams(request).toString();
        const fullUrl = `${urlBase}${url}?format=json&${query}`;

        try {
            const response = await fetch(fullUrl, {
                method: "GET",
                headers: buildHeaders(),
            });
            return await handleResponse(response, useWaitControl, isEvaluateMessage);
        } catch (error) {
            if (useWaitControl) CoreUtils.waitControlHide();
            CoreUtils.notificationError(error.message);
            return null;
        }
    }

    static async post(url, body = {}, useWaitControl = true, isEvaluateMessage = true) {
        if (useWaitControl) CoreUtils.waitControlShow();

        const request = { ...body, RequestUserInfo: getRequestUserInfo() };

        try {
            const response = await fetch(`${urlBase}${url}`, {
                method: "POST",
                headers: buildHeaders(),
                body: JSON.stringify(request),
            });
            return await handleResponse(response, useWaitControl, isEvaluateMessage);
        } catch (error) {
            if (useWaitControl) CoreUtils.waitControlHide();
            CoreUtils.notificationError(error.message);
            return null;
        }
    }

    static async put(url, body = {}, useWaitControl = true, isEvaluateMessage = true) {
        if (useWaitControl) CoreUtils.waitControlShow();

        const request = { ...body, RequestUserInfo: getRequestUserInfo() };

        try {
            const response = await fetch(`${urlBase}${url}`, {
                method: "PUT",
                headers: buildHeaders(),
                body: JSON.stringify(request),
            });
            return await handleResponse(response, useWaitControl, isEvaluateMessage);
        } catch (error) {
            if (useWaitControl) CoreUtils.waitControlHide();
            CoreUtils.notificationError(error.message);
            return null;
        }
    }

    static async delete(url, body = {}, useWaitControl = true, isEvaluateMessage = true) {
        if (useWaitControl) CoreUtils.waitControlShow();

        const request = { ...body, RequestUserInfo: getRequestUserInfo() };

        try {
            const response = await fetch(`${urlBase}${url}`, {
                method: "DELETE",
                headers: buildHeaders(),
                body: JSON.stringify(request),
            });
            return await handleResponse(response, useWaitControl, isEvaluateMessage);
        } catch (error) {
            if (useWaitControl) CoreUtils.waitControlHide();
            CoreUtils.notificationError(error.message);
            return null;
        }
    }

    static async authenticate(url, credentials, useWaitControl = true, isEvaluateMessage = true) {
        if (useWaitControl) CoreUtils.waitControlShow();

        const formData = new URLSearchParams();
        formData.append("grant_type", "password");
        formData.append("usuarioId", credentials.userName);
        formData.append("password", credentials.password);

        try {
            const response = await fetch(`${urlBase}${url}`, {
                method: "POST",
                headers: buildHeaders("application/x-www-form-urlencoded"),
                body: formData.toString(),
            });
            const data = await response.json();
            if (useWaitControl) CoreUtils.waitControlHide();
            if (isEvaluateMessage) showValidationMessage(data);
            return data;
        } catch (error) {
            if (useWaitControl) CoreUtils.waitControlHide();
            CoreUtils.notificationError(error.message);
            return null;
        }
    }
}