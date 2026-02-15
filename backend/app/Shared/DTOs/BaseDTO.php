<?php
namespace App\Shared\DTOs;

abstract class BaseDTO
{
    public static function fromArray(array $data): static
    {
        return new static(...$data);
    }
}
