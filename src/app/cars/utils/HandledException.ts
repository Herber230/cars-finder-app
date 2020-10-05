

class HandledException
{
    constructor(public type : HandledExceptionType) { }
}

enum HandledExceptionType
{
    NO_AVAILABLE_BACKEND,
    EMPTY_BACKEND
}

export { HandledException, HandledExceptionType }