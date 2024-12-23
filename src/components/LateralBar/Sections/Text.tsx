'use client';
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function Text() {
    const tagOptions = [
        {value: "h1", label: "h1"},
        {value: "h2", label: "h2"},
        {value: "h3", label: "h3"},
        {value: "h4", label: "h4"},
        {value: "h5", label: "h5"},
        {value: "h6", label: "h6"},
        {value: "p", label: "p"},
        {value: "span", label: "span"},
    ]

    return (
        <div>
            <div className="flex gap-2">
                <Input className="w-1/2" placeholder="Seu texto aqui..."/>

                <Select>
                        <SelectTrigger className="w-1/2">
                            <SelectValue placeholder={'Escolha sua tag...'} />
                        </SelectTrigger>
                        <SelectContent>
                            {tagOptions.map(option => 
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            )}
                        </SelectContent>
                </Select>
            </div>
        </div>
    )
}