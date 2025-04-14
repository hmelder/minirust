import { ParserRuleContext, ParseTree } from 'antlr4ng' // For location info

export interface TypeError {
    message: string
    ctx: ParseTree // The AST node where the error occurred
}

export function createTypeError(message: string, ctx: ParseTree): TypeError {
    // You could add line/column info here from ctx.start?.line etc.
    return { message, ctx }
}
